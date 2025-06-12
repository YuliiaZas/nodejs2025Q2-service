import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return true;
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
