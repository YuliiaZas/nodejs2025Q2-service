import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({ format: 'uuid' })
  id: string; // uuid v4

  @ApiProperty({ example: 'john_doe' })
  login: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiProperty({ example: 1 })
  version: number; // integer number, increments on update

  @ApiProperty({ example: 1716927665136 })
  createdAt: number; // timestamp of creation

  @ApiProperty({ example: 1716927665136 })
  updatedAt: number; // timestamp of last update
}
