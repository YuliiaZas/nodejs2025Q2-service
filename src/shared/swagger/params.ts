import { ApiParam } from '@nestjs/swagger';
import { getIdExample } from './examples';
import { Entity } from '../types/entity.enum';

export function ApiIdParams(entity: Entity) {
  return ApiParam({
    name: 'id',
    type: String,
    description: `The unique identifier of the ${entity} (UUID v4 format)`,
    example: getIdExample(entity),
    format: 'uuid',
    required: true,
  });
}
