import { capitalizeFirstLetter } from './capitalize-first-letter';
import { EntityName } from '../types/entity-name.enum';

export const getNotFoundMessage = (
  id: string,
  entity: EntityName,
  info?: string,
): string => {
  return `${capitalizeFirstLetter(entity)} with ID ${id} not found${info ? ` ${info}` : ''}`;
};
