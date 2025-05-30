import { EntityName } from '../types/entity-name.enum';
import { MusicEntityName } from '../types/music-entity-name.type';

export const validateMusicEntityName = (
  entity: string,
): entity is MusicEntityName => {
  const validEntities = [
    EntityName.ARTIST,
    EntityName.ALBUM,
    EntityName.TRACK,
  ] as string[];
  return validEntities.includes(entity);
};
