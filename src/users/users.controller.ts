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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'This endpoint allows you to create a new user with a username and password.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'login must be longer than or equal to 3 characters',
          'password must be longer than or equal to 4 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint retrieves a list of all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of users has been successfully retrieved.',
    type: [User],
  })
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'This endpoint retrieves a user by their ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The user with the specified ID does not exist.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input ID is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format. Must be a UUID v4',
        error: 'Bad Request',
      },
    },
  })
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
      'This endpoint allows you to update the password of an existing user. The old password must be provided for verification.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user password has been successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. The current password is incorrect.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Current password is incorrect',
        error: 'Forbidden',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The user with the specified ID does not exist.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'oldPassword should not be empty',
          'newPassword must be longer than or equal to 4 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'This endpoint deletes a user by their ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The user with the specified ID does not exist.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input ID is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format. Must be a UUID v4',
        error: 'Bad Request',
      },
    },
  })
  @HttpCode(204)
  async deleteUser(@Param() { id }: IdDto): Promise<void> {
    return this.usersService.deleteUser(id).then((isUserDeleted) => {
      if (!isUserDeleted) throw new UserNotFoundException(id);
      return;
    });
  }
}
