import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AIModule } from './ai/ai.module';
import { AppController } from './app.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule, DATA_SOURCE } from './auth/auth.module';
import { DBModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { serveClient } from './utils/utils';

@Module({
	imports: [DBModule, AIModule, UsersModule, AuthModule.register({ prefix: 'placeholder' }), ...serveClient()],
	controllers: [AppController],
	providers: [{ provide: DATA_SOURCE, useClass: UsersService }]
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}

