import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { Protected } from './auth/protected.decorator';
import { LoginDTO, RegisterDTO } from './users/users.dtos';
import { MeUser } from './users/users.models';
import { UsersService } from './users/users.service';
import { ReqUser } from './utils/decorators/user.decorator';

@Controller()
export class AppController {
	constructor(private readonly users: UsersService) {}

	@Get('/me')
	@Protected()
	public getMe(@ReqUser() { id, email, fihrId, token }: User): MeUser {
		return { id, email, fihrId, token };
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
}

