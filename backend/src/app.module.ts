import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule, DATA_SOURCE, PREFIX } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { serveClient } from './utils/utils';

@Module({
	imports: [UsersModule, AuthModule.register({ prefix: 'placeholder' }), ...serveClient()],
	controllers: [AppController],
	providers: [
		{ provide: PREFIX, useValue: 'placeholder' },
		{ provide: DATA_SOURCE, useClass: UsersService }
	]
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}

