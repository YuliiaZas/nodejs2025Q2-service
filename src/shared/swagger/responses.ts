import { ApiResponse } from '@nestjs/swagger';

import { SwaggerResponseType } from '../types/swagger-response.type';

export function Api200OkResponse<T extends SwaggerResponseType>(
  entity: string,
  type: T,
  unchangedEntity: boolean = false,
  isUpdate: boolean = false,
) {
  const entityValue = unchangedEntity
    ? entity
    : Array.isArray(type)
      ? `A list of ${entity}s`
      : `The ${entity}`;
  return ApiResponse({
    status: 200,
    description: `${entityValue} has been successfully ${isUpdate ? 'updated' : 'retrieved'}.`,
    type,
  });
}

export function Api201CreatedResponse<T extends SwaggerResponseType>(
  entity: string,
  type: T,
  isAddedToFavorites: boolean = false,
) {
  return ApiResponse({
    status: 201,
    description: `The ${entity ?? 'data'} has been successfully ${isAddedToFavorites ? 'added to favorites' : 'created'}.`,
    type,
  });
}

export function Api204NoContentResponse(
  entity: string,
  isDeletedFromFavorites: boolean = false,
) {
  return ApiResponse({
    status: 204,
    description: `The ${entity ?? 'data'} has been successfully ${isDeletedFromFavorites ? 'removed from favorites' : 'deleted'}.`,
  });
}
