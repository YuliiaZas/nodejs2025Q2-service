import { Module } from '@nestjs/common';

import { UsersDatabase } from '@/database';
import { EntityName, PrismaModule, TOKEN_DATABASE } from '@/shared';

import { PasswordService } from './password.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    PasswordService,
    UsersService,
    {
      provide: TOKEN_DATABASE[EntityName.USER],
      useClass: UsersDatabase,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
