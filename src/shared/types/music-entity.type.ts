import { Entity } from './entity.enum';

export type MusicEntity = Exclude<Entity, Entity.USER>;
