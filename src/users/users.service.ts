import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersDatabase } from './interfaces/users-database.interface';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { PasswordService } from './password.service';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { IUsersService } from './interfaces/users-service.interface';

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
      .updateUserPassword(id, hashedPassword)
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        throw error;
      })
      .then((user) => plainToInstance(User, user));
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
