import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared';
import { CreateUserDto, IUsersDatabase, User } from '@/users';

@Injectable()
export class UsersDatabase implements IUsersDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async addUser(userParams: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: userParams,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { login } });
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.prisma.user
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false);
  }

  async updateUserFields(
    id: string,
    updatedFields: Partial<User>,
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updatedFields,
        version: {
          increment: 1,
        },
      },
    });
  }
}
