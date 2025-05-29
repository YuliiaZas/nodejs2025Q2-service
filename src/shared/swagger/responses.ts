import { Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

type ResponseType = string | Type<unknown> | [Type<unknown>];

export function Api400BadRequestResponse(details: string[] = []) {
  return ApiResponse({
    status: 400,
    description: details.length
      ? 'Bad Request. The input data is invalid.'
      : 'Bad Request. The ID property is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: details.length
          ? details
          : 'Invalid ID format. Must be a UUID v4',
        error: 'Bad Request',
      },
    },
  });
}

export function Api404NotFoundResponse(entity: string, idExample?: string) {
  return ApiResponse({
    status: 404,
    description: `${entity} not found. The ${entity.toLowerCase()} with the specified ID does not exist.`,
    schema: {
      example: {
        statusCode: 404,
        message: `${entity} with ID ${idExample ?? '123e4567-e89b-12d3-a456-426614174000'} not found`,
        error: 'Not Found',
      },
    },
  });
}

export function Api403ForbiddenResponse(message: string) {
  return ApiResponse({
    status: 403,
    description:
      'Forbidden. The user does not have permission to perform this action.',
    schema: {
      example: {
        statusCode: 403,
        message,
        error: 'Forbidden',
      },
    },
  });
}

export function Api200OkResponse<T extends ResponseType>(
  entity: string,
  type: T,
  unchangedEntity: boolean = false,
  isUpdate: boolean = false,
) {
  const entityValue = unchangedEntity
    ? entity
    : Array.isArray(type)
      ? `A list of ${entity.toLowerCase()}s`
      : `The ${entity.toLowerCase()}`;
  return ApiResponse({
    status: 200,
    description: `${entityValue} has been successfully ${isUpdate ? 'updated' : 'retrieved'}.`,
    type,
  });
}

export function Api201CreatedResponse<T extends ResponseType>(
  entity: string,
  type: T,
) {
  return ApiResponse({
    status: 201,
    description: `The ${entity.toLowerCase() ?? 'data'} has been successfully created.`,
    type,
  });
}

export function Api204NoContentResponse(entity: string) {
  return ApiResponse({
    status: 204,
    description: `The ${entity.toLowerCase() ?? 'data'} has been successfully deleted.`,
  });
}
