import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabase } from 'src/database/users-database';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersDatabase,
    },
  ],
})
export class UsersModule {}
