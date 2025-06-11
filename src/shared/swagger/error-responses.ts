import { ApiResponse } from '@nestjs/swagger';

import { EntityName } from '../types/entity-name.enum';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';
import { getNotExistMessage } from '../utils/get-not-exist-message';
import { getNotFoundMessage } from '../utils/get-not-found-message';
import { getIdExample } from './examples';

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

export function Api401UnauthorizedResponse(message?: string) {
  const defaultMesage =
    'Unauthorized. The user is not authenticated or the token is invalid.';
  return ApiResponse({
    status: 401,
    description: message ?? defaultMesage,
    schema: {
      example: {
        statusCode: 401,
        message: message ?? defaultMesage,
        error: 'Unauthorized',
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

export function Api404NotFoundResponse(
  entity: EntityName,
  inFavoretes: boolean = false,
) {
  const info = inFavoretes ? ' in favorites' : '';
  return ApiResponse({
    status: 404,
    description: `${capitalizeFirstLetter(entity)} not found${info}. The ${entity} with the specified ID does not exist${info}.`,
    schema: {
      example: {
        statusCode: 404,
        message: getNotFoundMessage(getIdExample(entity), entity, info.trim()),
        error: 'Not Found',
      },
    },
  });
}

export function Api422NotExistResponse(
  entity: EntityName,
  secondEntity?: EntityName,
) {
  const secondEntityValue = secondEntity ? ` or ${secondEntity}` : '';
  return ApiResponse({
    status: 422,
    description: `${capitalizeFirstLetter(entity)}${secondEntityValue} not exist. The ${entity}${secondEntityValue} with the specified ID does not exist.`,
    schema: {
      example: {
        statusCode: 422,
        message: getNotExistMessage(getIdExample(entity), entity),
        error: 'Not Found',
      },
    },
  });
}
