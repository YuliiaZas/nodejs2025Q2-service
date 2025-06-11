import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, process.env.CRYPT_SALT || this.saltRounds);
  }

  async comparePasswords(
    userHashedPassword: string,
    passedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(passedPassword, userHashedPassword);
  }
}
