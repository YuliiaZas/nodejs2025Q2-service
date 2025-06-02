import { EntityName } from '../types/entity-name.enum';
import { capitalizeFirstLetter } from './capitalize-first-letter';

export const getNotFoundMessage = (
  id: string,
  entity: EntityName,
  info?: string,
): string => {
  return `${capitalizeFirstLetter(entity)} with ID ${id} not found${info ? ` ${info}` : ''}`;
};
