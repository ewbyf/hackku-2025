import { Body, Controller, Get, Post, Query, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AIService } from './ai/ai.service';
import { Protected } from './auth/protected.decorator';
import { LoginDTO, RegisterDTO, TakePrescriptionDTO } from './users/users.dtos';
import { meUser, MeUser } from './users/users.models';
import { UsersService } from './users/users.service';
import { ReqUser } from './utils/decorators/user.decorator';

@Controller()
export class AppController {
	constructor(private readonly users: UsersService, private readonly ai: AIService) {}

	@Get('/me')
	@Protected()
	public async getMe(@ReqUser() { id }: User): Promise<MeUser> {
		return (await this.users.get({ id }, meUser))!;
	}

	@Post('/register')
	public async register(@Body() data: RegisterDTO): Promise<MeUser> {
		return this.users.register(data);
	}

	@Post('/login')
	public async login(@Body() data: LoginDTO): Promise<MeUser> {
		const user = await this.users.login(data);

		if (!user) throw new UnauthorizedException('User with email/password combination not found');

		return user;
	}

	@Post('/take')
	@Protected()
	public async takePrescription(@ReqUser() user: User, @Body() { prescriptionId }: TakePrescriptionDTO): Promise<void> {
		return this.users.take(user, prescriptionId);
	}

	@Get('/translate')
	@Protected()
	public async translate(@Query('language') language: string, @Query('text') text: string): Promise<string> {
		return this.ai.translate(language, text);
	}
}

