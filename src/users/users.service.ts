import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './interfaces/users-repository.interface';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService implements UsersRepository {
  constructor(
    @Inject('UsersRepository')
    private readonly storage: UsersRepository,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    return this.storage
      .addUser(createUserDto)
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

  async updateUserFields(id: string, updatedFields: Partial<User>) {
    return this.storage
      .updateUserFields(id, updatedFields)
      .then((user) => plainToInstance(User, user));
  }

  async updateUserPasword(id: string, password: string) {
    return this.storage
      .updateUserPasword(id, password)
      .then((user) => plainToInstance(User, user));
  }

  async deleteUser(id: string) {
    return this.storage.deleteUser(id);
  }

  async isUserPasswordCorrect(
    id: string,
    password: string,
  ): Promise<boolean | null> {
    return this.storage.isUserPasswordCorrect(id, password);
  }
}
