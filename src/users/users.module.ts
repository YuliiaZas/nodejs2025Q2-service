import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabase } from 'src/database/users.database';
import { PasswordService } from './password.service';

@Module({
  controllers: [UsersController],
  providers: [
    PasswordService,
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersDatabase,
    },
  ],
})
export class UsersModule {}
