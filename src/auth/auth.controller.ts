import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api400BadRequestResponse,
  Api401UnauthorizedResponse,
  Api403ForbiddenResponse,
  EntityName,
} from '@/shared';
import { CreateUserDto, User } from '@/users';

import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponse } from './interfaces/auth-response.interface';

const ENTITY_NAME = EntityName.USER;

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up a new user',
    description:
      'This endpoint allows a new user to sign up with a login and password.',
  })
  @Api201CreatedResponse(ENTITY_NAME, User)
  @Api400BadRequestResponse([
    'login must be longer than or equal to 3 characters',
    'password must be longer than or equal to 4 characters',
  ])
  async signup(@Body() loginDto: CreateUserDto): Promise<User> {
    return this.authService.signup(loginDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in an existing user',
    description:
      'This endpoint allows an existing user to log in with their login and password.',
  })
  @Api200OkResponse('Tokens', AuthResponse, true, false)
  @Api400BadRequestResponse([
    'login must be longer than or equal to 3 characters',
    'password must be longer than or equal to 4 characters',
  ])
  @Api403ForbiddenResponse('Login or password is incorrect')
  async login(@Body() loginDto: CreateUserDto): Promise<AuthResponse | null> {
    return this.authService.login(loginDto).then((res) => {
      if (!res) throw new ForbiddenException('Login or password is incorrect');
      return res;
    });
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh user session',
    description:
      'This endpoint allows a user to refresh their session using a refresh token.',
  })
  @Api200OkResponse('Tokens', AuthResponse, true, true)
  @Api400BadRequestResponse(['refreshToken must be a jwt string'])
  @Api401UnauthorizedResponse('Refresh token is required')
  @Api403ForbiddenResponse('Refresh token is invalid or expired')
  async refresh(@Body() refreshDto: RefreshDto): Promise<AuthResponse | null> {
    return this.authService.refresh(refreshDto).then((res) => {
      if (!res)
        throw new ForbiddenException('Refresh token is invalid or expired');
      return res;
    });
  }
}
