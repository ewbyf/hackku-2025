import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Protected } from './protected.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const metadata = this.reflector.get(Protected, context.getHandler());

		if (metadata) {
			const req = context.switchToHttp().getRequest<Request>();
			const user = req.user;

			return !!user;
		} else {
			return true;
		}
	}
}

