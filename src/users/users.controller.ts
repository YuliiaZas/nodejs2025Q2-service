import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ForbiddenException,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { IdDto } from 'src/shared/dto/id.dto';
import { UserNotFoundException } from 'src/shared/exseptions/not-found.exseptions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Api400BadRequestResponse,
  Api201CreatedResponse,
  Api403ForbiddenResponse,
  Api204NoContentResponse,
  Api404NotFoundResponse,
  Api200OkResponse,
} from 'src/shared/swagger/responses';
import { ApiIdParams } from 'src/shared/swagger/params';

const ENTITY_NAME = 'User';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
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
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint retrieves a list of all users.',
  })
  @Api200OkResponse(ENTITY_NAME, [User])
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
  @Api404NotFoundResponse(ENTITY_NAME)
  async getUser(@Param() { id }: IdDto): Promise<User> {
    return this.usersService.getUser(id).then((user) => {
      if (!user) throw new UserNotFoundException(id);
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
  @Api403ForbiddenResponse('Current password is incorrect')
  @Api404NotFoundResponse(ENTITY_NAME)
  async updateUserPassword(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<User> {
    await this.usersService
      .isUserPasswordCorrect(id, updateUserDto.oldPassword)
      .then((isUserPasswordCorrect) => {
        if (isUserPasswordCorrect === null) throw new UserNotFoundException(id);
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
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteUser(@Param() { id }: IdDto): Promise<void> {
    return this.usersService.deleteUser(id).then((isUserDeleted) => {
      if (!isUserDeleted) throw new UserNotFoundException(id);
      return;
    });
  }
}
