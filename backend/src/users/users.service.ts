import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import axios from 'axios';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';
import { AIService } from 'src/ai/ai.service';
import { AuthDataSource } from 'src/auth/auth.module';
import { DBService } from 'src/db/db.service';
import { LoginDTO, RegisterDTO } from './users.dtos';
import { meUser, MeUser } from './users.models';

@Injectable()
export class UsersService implements AuthDataSource {
	public constructor(private readonly db: DBService, private readonly ai: AIService) {}

	public async get<S extends Prisma.UserDefaultArgs>(
		where: Prisma.UserWhereUniqueInput,
		selectors: S = {} as any
	): Promise<Prisma.UserGetPayload<S> | null> {
		return this.db.user.findUnique({ where, ...selectors }) as any;
	}

	public async take(user: User, prescriptionId: string): Promise<void> {
		await this.db.prescription.update({
			where: { id_userId: { id: prescriptionId, userId: user.id } },
			data: { takenToday: { increment: 1 }, lastTaken: new Date() }
		});
	}

	public async login({ email, password }: LoginDTO): Promise<MeUser | null> {
		email = email.toLowerCase();

		const user = await this.db.user.findUnique({ where: { email } });

		// avoid leaking existence data (via timing)
		return !compareSync(password, user?.password ?? '') ? null : this.db.user.findUnique({ where: { email }, ...meUser });
	}

	public async register({ email, password }: RegisterDTO): Promise<MeUser> {
		email = email.toLowerCase();

		const id = createId();
		const hashedPassword = hashSync(password, genSaltSync());

		const plan = await axios.get('https://hapi.fhir.org/baseR4/CarePlan/53333?_format=json').then((res) => res.data);

		const patient = plan.subject.reference;
		const fihrId = patient.split('/')[1];

		const prescriptions = await axios
			.get('https://hapi.fhir.org/baseR4/MedicationStatement?_pretty=true&patient=Patient/30163&_format=json')
			.then((res) => res.data.entry)
			.then((data) => data.filter((p) => !p.resource.dosage[0].asNeededBoolean && p.resource.medicationCodeableConcept));

		if (prescriptions.length === 0) return this.register({ email, password });

		return this.db.user
			.create({
				data: {
					id,
					email,
					password: hashedPassword,
					token: randomBytes(32).toString('hex'),
					fihrId,
					prescriptions: {
						create: await Promise.all(
							prescriptions
								.map(async (prescription): Promise<Prisma.PrescriptionCreateWithoutUserInput> => {
									const [dose] = prescription.resource.dosage;
									const parts = dose.text.split(' ');

									let dosage, vector, timing;

									if (parts.length > 2) {
										[dosage, vector, ...timing] = parts;

										dosage = dosage === 'once' ? 1 : Number(dosage);
										timing = timing.join(' ');
										if (timing.includes('hours') || timing.includes('daily')) timing = null;
									} else {
										dosage = 1;
										vector = null;
										timing = null;
									}

									const medication = prescription.resource.medicationCodeableConcept.coding[0].display
										.split(' ')
										.map((word) => word[0].toUpperCase() + word.slice(1))
										.join(' ');

									return {
										medication,
										description: await this.ai.describe(medication),
										dosage,
										vector,
										timing,
										freq: dose.timing.repeat.frequency,
										period: dose.timing.repeat.period,
										periodUnit: dose.timing.repeat.periodUnit,
										takenToday: 0,
										lastTaken: null
									};
								})
								.concat({
									medication: 'Snake Oil',
									description: 'High quality snake oil',
									dosage: 1,
									freq: 2,
									period: 1,
									periodUnit: 'h',
									takenToday: 0,
									lastTaken: null
								})
						)
					},
					procedures: { create: await this._explain(plan.activity) }
				},
				...meUser
			})
			.catch((err) => {
				if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
					return this.register({ email, password });
				} else {
					throw err;
				}
			});
	}

	public async auth(token: string): Promise<User | null> {
		return this.get({ token });
	}

	private async _explain(procedures: any[]): Promise<Prisma.PatientProcedureCreateWithoutUserInput[]> {
		const procs = procedures.filter((procedure) => procedure.detail.code);
		const procNames = procs.map((procedure) => procedure.detail.code.coding[0].display);

		const explainedProcs = await this.db.explainedProcedure.findMany({ where: { technical: { in: procNames } } });

		return Promise.all(
			procNames.map(async (name, i) =>
				explainedProcs.some((explanation) => name === explanation.technical)
					? { order: i, explanation: { connect: { technical: name } } }
					: { order: i, explanation: { create: { technical: name, explanation: await this.ai.explain(name) } } }
			)
		);
	}
}

