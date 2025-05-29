import { ApiParam } from '@nestjs/swagger';
import { getIdExample } from './examples';
import { Entity } from '../entity.enum';

export function ApiIdParams(entity: Entity) {
  return ApiParam({
    name: 'id',
    type: String,
    description: `The unique identifier of the ${entity.toLowerCase()} (UUID v4 format)`,
    example: getIdExample(entity),
    format: 'uuid',
    required: true,
  });
}
