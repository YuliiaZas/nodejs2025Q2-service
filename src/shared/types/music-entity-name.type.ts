import { EntityName } from './entity-name.enum';

export type MusicEntityName = Exclude<EntityName, EntityName.USER>;
