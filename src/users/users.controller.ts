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
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param() { id }: IdDto): Promise<User> {
    return this.usersService.getUser(id).then((user) => {
      if (!user) throw new UserNotFoundException(id);
      return user;
    });
  }

  @Put(':id')
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
  async deleteUser(@Param() { id }: IdDto): Promise<void> {
    return this.usersService.deleteUser(id).then((isUserDeleted) => {
      if (!isUserDeleted) throw new UserNotFoundException(id);
      return;
    });
  }
}
