import { createId } from '@paralleldrive/cuid2';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import axios from 'axios';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';
import { AuthDataSource } from 'src/auth/auth.module';
import { DBService } from 'src/db/db.service';
import { LoginDTO, RegisterDTO } from './users.dtos';
import { meUser, MeUser } from './users.models';

export class UsersService implements AuthDataSource {
	public constructor(private readonly db: DBService) {}

	public async get<S extends Prisma.UserDefaultArgs>(
		where: Prisma.UserWhereUniqueInput,
		selectors: S = {} as any
	): Promise<Prisma.UserGetPayload<S> | null> {
		return this.db.user.findUnique({ where, ...selectors }) as any;
	}

	public async login({ email, password }: LoginDTO): Promise<MeUser | null> {
		const user = await this.db.user.findUnique({ where: { email } });

		// avoid leaking existence data (via timing)
		return !compareSync(password, user?.password ?? '') ? null : this.db.user.findUnique({ where: { email }, ...meUser });
	}

	public async register({ email, password }: RegisterDTO): Promise<MeUser> {
		const id = createId();
		const hashedPassword = hashSync(password, genSaltSync());

		const plans = await axios.get('https://hapi.fhir.org/baseR4/CarePlan?_format=json').then((res) => res.data);
		const plan = plans[Math.floor(Math.random() * plans.length)];

		const patient = plan.resource.subject.reference;
		const fihrId = patient.split('/')[1];

		const prescriptions = await axios
			.get(`https://hapi.fhir.org/baseR4/MedicationStatement?_pretty=true&_subject.reference=${patient}&_format=json`)
			.then((res) => res.data.filter((p) => p.subject.reference === patient && !p.dosage[0].asNeededBoolean));

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
						create: prescriptions.map((prescription): Prisma.PrescriptionCreateWithoutUserInput => {
							const [dose] = prescription.resource;
							const parts = dose.text.split(' ');

							let dosage, vector;

							if (parts.length > 2) {
								[dosage, vector] = parts;

								dosage = Number(dosage);
							} else {
								dosage = 1;
								vector = null;
							}

							return {
								medication: prescription.resource.medicationCodeableConcept.text,
								dosage,
								vector,
								freq: dose.timing.repeat.frequency,
								period: dose.timing.repeat.period,
								periodUnit: dose.timing.repeat.periodUnit,
								lastTaken: null
							};
						})
					}
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
}

