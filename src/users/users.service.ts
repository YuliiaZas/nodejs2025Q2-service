import { Inject, Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { AppNotFoundException, EntityName, TOKEN_DATABASE } from '@/shared';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUsersDatabase } from './interfaces/users-database.interface';
import { IUsersService } from './interfaces/users-service.interface';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(TOKEN_DATABASE[EntityName.USER])
    private readonly storage: IUsersDatabase,
    private readonly passwordService: PasswordService,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    const createUserDtoWithHashedPassword = {
      ...createUserDto,
      password: await this.passwordService.hashPassword(createUserDto.password),
    };
    return this.storage
      .addUser(createUserDtoWithHashedPassword)
      .then((user) => plainToInstance(User, user));
  }

  async getUsers() {
    return this.storage
      .getUsers()
      .then((users) => plainToInstance(User, users));
  }

  async getUser(id: string) {
    return this.storage.getUser(id).then((user) => plainToInstance(User, user));
  }

  async deleteUser(id: string) {
    return this.storage.deleteUser(id);
  }

  async updateUserPassword(id: string, password: string) {
    const hashedPassword = await this.passwordService.hashPassword(password);

    return this.storage
      .updateUserFields(id, { password: hashedPassword })
      .then((user) => {
        if (!user) {
          throw new AppNotFoundException(id, EntityName.USER);
        }
        return plainToInstance(User, user);
      });
  }

  async isUserPasswordCorrect(
    id: string,
    password: string,
  ): Promise<boolean | null> {
    const user = await this.storage.getUser(id);
    if (!user) return null;
    return this.passwordService.comparePasswords(user.password, password);
  }
}
