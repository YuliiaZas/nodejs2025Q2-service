import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, User } from '@/users';
import { UsersService } from '@/users/users.service';

import { RefreshDto } from './dto/refresh.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { JwtPayload } from './interfaces/jwt-payload.type';

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

  async refresh(
    refreshDto: RefreshDto,
    id?: string,
  ): Promise<AuthResponse | null> {
    if (!id) {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
      id = payload.userId;
    }

    const user = await this.usersService.getUser(id);
    if (!user) {
      return null;
    }

    return this.getTokens(user);
  }

  private async getTokens(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      userId: user.id,
      login: user.login,
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
