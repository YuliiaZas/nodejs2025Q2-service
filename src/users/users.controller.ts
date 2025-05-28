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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param() { id }: IdDto) {
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
    });
  }
}
