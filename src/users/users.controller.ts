import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api204NoContentResponse,
  Api400BadRequestResponse,
  Api401UnauthorizedResponse,
  Api403ForbiddenResponse,
  Api404NotFoundResponse,
  ApiIdParams,
  AppNotFoundException,
  EntityName,
  IdDto,
} from '@/shared';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const ENTITY_NAME = EntityName.USER;

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'This endpoint creates a new user with a login and password.',
  })
  @Api201CreatedResponse(ENTITY_NAME, User)
  @Api400BadRequestResponse([
    'login must be longer than or equal to 3 characters',
    'password must be longer than or equal to 4 characters',
  ])
  @Api401UnauthorizedResponse()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint retrieves a list of all users.',
  })
  @Api200OkResponse(ENTITY_NAME, [User])
  @Api401UnauthorizedResponse()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'This endpoint retrieves a user by their ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, User)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async getUser(@Param() { id }: IdDto): Promise<User> {
    return this.usersService.getUser(id).then((user) => {
      if (!user) throw new AppNotFoundException(id, ENTITY_NAME);
      return user;
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user password',
    description:
      'This endpoint updates the password of an existing user. The old password must be provided for verification.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse('The user password', User, true, true)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api403ForbiddenResponse('Current password is incorrect')
  @Api404NotFoundResponse(ENTITY_NAME)
  async updateUserPassword(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<User> {
    await this.usersService
      .isUserPasswordCorrect(id, updateUserDto.oldPassword)
      .then((isUserPasswordCorrect) => {
        if (isUserPasswordCorrect === null)
          throw new AppNotFoundException(id, ENTITY_NAME);
        if (!isUserPasswordCorrect) {
          throw new ForbiddenException('Current password is incorrect');
        }
      });

    return this.usersService.updateUserPassword(id, updateUserDto.newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'This endpoint deletes a user by their ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api204NoContentResponse(ENTITY_NAME)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteUser(@Param() { id }: IdDto): Promise<void> {
    return this.usersService.deleteUser(id).then((isUserDeleted) => {
      if (!isUserDeleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
