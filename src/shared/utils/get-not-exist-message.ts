import { capitalizeFirstLetter } from './capitalize-first-letter';
import { Entity } from '../types/entity.enum';

export const getNotExistMessage = (id: string, entity: Entity): string => {
  return `${capitalizeFirstLetter(entity)} with ID ${id} does not exist`;
};
