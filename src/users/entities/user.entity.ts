import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiPropertyOptional({ format: 'uuid' })
  id: string; // uuid v4

  @ApiPropertyOptional({ example: 'john_doe' })
  login: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiPropertyOptional({ example: 1 })
  version: number; // integer number, increments on update

  @ApiPropertyOptional({ example: 1716927665136 })
  createdAt: number; // timestamp of creation

  @ApiPropertyOptional({ example: 1716927665136 })
  updatedAt: number; // timestamp of last update
}
