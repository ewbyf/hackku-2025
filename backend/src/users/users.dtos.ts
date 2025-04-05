import { IsEmail, IsString } from 'class-validator';
import { fi } from 'src/utils/utils';

export class LoginDTO {
	@IsEmail()
	email: string = fi();

	@IsString()
	password: string = fi();
}

export class RegisterDTO {
	@IsEmail()
	email: string = fi();

	@IsString()
	password: string = fi();
}

export class TakePrescriptionDTO {
	@IsString()
	prescriptionId: string = fi();
}

