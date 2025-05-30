import { capitalizeFirstLetter } from './capitalize-first-letter';
import { EntityName } from '../types/entity-name.enum';

export const getNotExistMessage = (id: string, entity: EntityName): string => {
  return `${capitalizeFirstLetter(entity)} with ID ${id} does not exist`;
};
