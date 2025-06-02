import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { CreateUserDto, IUsersDatabase, User } from '@/users';

@Injectable()
export class UsersDatabase implements IUsersDatabase {
  private users: Map<string, User> = new Map();

  async addUser(userParams: CreateUserDto): Promise<User> {
    const user: User = {
      ...this.getNewUserBoilerplate(),
      ...userParams,
    };
    this.users.set(user.id, user);
    return Promise.resolve(user);
  }

  async getUsers(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }

  async getUser(id: string): Promise<User | null> {
    return Promise.resolve(this.users.get(id));
  }

  async deleteUser(id: string): Promise<boolean> {
    return Promise.resolve(this.users.delete(id));
  }

  async updateUserPassword(id: string, password: string): Promise<User | null> {
    return this.updateUserFields(id, { password });
  }

  private async updateUserFields(
    id: string,
    updatedFields: Partial<User>,
  ): Promise<User | null> {
    const user = await this.users.get(id);
    if (!user) {
      return Promise.resolve(null);
    }

    const updatedUser = {
      ...user,
      ...updatedFields,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return Promise.resolve(this.users.set(id, updatedUser)).then(
      () => updatedUser,
    );
  }

  private getNewUserBoilerplate(): Omit<User, keyof CreateUserDto> {
    const currentTime = Date.now();
    return {
      id: randomUUID(),
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }
}
