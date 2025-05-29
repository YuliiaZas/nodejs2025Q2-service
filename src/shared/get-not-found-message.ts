import { Entity } from './entity.enum';

export const getNotFoundMessage = (id: string, entity: Entity): string => {
  return `${entity} with ID ${id} not found`;
};
