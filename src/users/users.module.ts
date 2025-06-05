import { Module } from '@nestjs/common';

import { UsersDatabase } from '@/database';
import { EntityName, SharedModule, TOKEN_DATABASE } from '@/shared';

import { PasswordService } from './password.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [
    PasswordService,
    UsersService,
    {
      provide: TOKEN_DATABASE[EntityName.USER],
      useClass: UsersDatabase,
    },
  ],
})
export class UsersModule {}
