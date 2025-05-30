import { capitalizeFirstLetter } from './capitalize-first-letter';
import { Entity } from '../types/entity.enum';

export const getNotFoundMessage = (
  id: string,
  entity: Entity,
  info?: string,
): string => {
  return `${capitalizeFirstLetter(entity)} with ID ${id} not found${info ? ` ${info}` : ''}`;
};
