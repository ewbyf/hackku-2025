import { Prisma } from '@prisma/client';

export const meUser = Prisma.validator<Prisma.UserDefaultArgs>()({
	omit: {
		password: true
	},
	include: {
		prescriptions: true,
		procedures: {
			include: {
				explanation: true
			}
		}
	}
});

export type MeUser = Prisma.UserGetPayload<typeof meUser>;

