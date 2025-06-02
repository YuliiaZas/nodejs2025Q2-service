import { EntityName } from '../types/entity-name.enum';

export const idExample = {
  [EntityName.USER]: '123e4567-e89b-12d3-a456-426614174000',
  [EntityName.ARTIST]: '123e4567-e89b-12d3-a456-426614174001',
  [EntityName.ALBUM]: '123e4567-e89b-12d3-a456-426614174002',
  [EntityName.TRACK]: '123e4567-e89b-12d3-a456-426614174003',
};

export const getIdExample = (entity: EntityName) => idExample[entity];
