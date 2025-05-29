import { Entity } from '../types/entity.enum';

export const idExample = {
  [Entity.USER]: '123e4567-e89b-12d3-a456-426614174000',
  [Entity.ARTIST]: '123e4567-e89b-12d3-a456-426614174001',
  [Entity.ALBUM]: '123e4567-e89b-12d3-a456-426614174002',
  [Entity.TRACK]: '123e4567-e89b-12d3-a456-426614174003',
};

export const getIdExample = (entity: Entity) => idExample[entity];
