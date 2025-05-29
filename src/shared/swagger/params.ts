import { ApiParam } from '@nestjs/swagger';

export function ApiIdParams(entity: string) {
  return ApiParam({
    name: 'id',
    type: String,
    description: `The unique identifier of the ${entity.toLowerCase()} (UUID v4 format)`,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  });
}
