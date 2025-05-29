import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login of the user',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
    required: true,
  })
  @Length(3, 20)
  login: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    minLength: 4,
    maxLength: 100,
    required: true,
  })
  @Length(4, 100)
  password: string;
}
