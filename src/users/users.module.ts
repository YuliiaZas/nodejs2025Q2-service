import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabase } from 'src/database/users.database';
import { PasswordService } from './password.service';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

@Module({
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
