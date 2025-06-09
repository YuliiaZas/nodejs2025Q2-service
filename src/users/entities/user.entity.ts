import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude, Transform } from 'class-transformer';

import { EntityName, getIdExample } from '@/shared';

export class User {
  @ApiPropertyOptional({
    format: 'uuid',
    example: getIdExample(EntityName.USER),
  })
  id: string;

  @ApiPropertyOptional({ example: 'john_doe' })
  login: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiPropertyOptional({ example: 1 })
  version: number; // integer number, increments on update

  @ApiPropertyOptional({ example: 1716927665136 })
  @Transform(({ value }) => Number(value))
  createdAt: bigint; // timestamp of creation

  @ApiPropertyOptional({ example: 1716927665136 })
  @Transform(({ value }) => Number(value))
  updatedAt: bigint; // timestamp of last update
}
