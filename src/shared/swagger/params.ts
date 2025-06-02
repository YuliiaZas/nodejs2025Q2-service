import { ApiParam } from '@nestjs/swagger';

import { EntityName } from '../types/entity-name.enum';
import { getIdExample } from './examples';

export function ApiIdParams(entity: EntityName) {
  return ApiParam({
    name: 'id',
    type: String,
    description: `The unique identifier of the ${entity} (UUID v4 format)`,
    example: getIdExample(entity),
    format: 'uuid',
    required: true,
  });
}
