import { Module } from '@nestjs/common';
import { AIModule } from 'src/ai/ai.module';
import { DBModule } from 'src/db/db.module';
import { UsersService } from './users.service';

@Module({
	imports: [DBModule, AIModule],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}

