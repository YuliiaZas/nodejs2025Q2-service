import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, User } from '@/users';
import { UsersService } from '@/users/users.service';

import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(loginDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(loginDto);
  }

  async login(loginDto: CreateUserDto): Promise<AuthResponse | null> {
    const user = await this.usersService.getUserAuthenticated(loginDto);
    if (!user) {
      return null;
    }

    return this.getTokens(user);
  }

  async refresh(refreshDto: {
    refreshToken: string;
  }): Promise<AuthResponse | null> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      const user = await this.usersService.getUser(payload.id);
      if (!user) {
        return null;
      }

      return this.getTokens(user);
    } catch (error) {
      return null;
    }
  }

  private async getTokens(user: User): Promise<AuthResponse> {
    const payload = {
      login: user.login,
      id: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '7d',
      }),
    };
  }
}
