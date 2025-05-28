import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
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
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    });
  }

  @Put(':id')
  async updateUserPasword(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<User> {
    console.log(
      `Updating password for user with id ${id} with new password ${updateUserDto.newPassword}`,
    );
    return this.usersService
      .isUserPasswordCorrect(id, updateUserDto.oldPassword)
      .then((isUserPasswordCorrect) => {
        console.log(`isUserPasswordCorrect`, isUserPasswordCorrect);
        if (isUserPasswordCorrect === null) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        if (!isUserPasswordCorrect) {
          throw new ForbiddenException('Current password is incorrect');
        }
      })
      .then(() => {
        return this.usersService.updateUserPasword(
          id,
          updateUserDto.newPassword,
        );
      });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() { id }: IdDto): Promise<string> {
    return this.usersService.deleteUser(id).then((isUserDeleted) => {
      if (!isUserDeleted) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return isUserDeleted.toString();
    });
  }
}
