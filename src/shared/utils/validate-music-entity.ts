import { Entity } from '../types/entity.enum';
import { MusicEntity } from '../types/music-entity.type';

export const validateMusicEntity = (entity: string): entity is MusicEntity => {
  const validEntities = [Entity.ARTIST, Entity.ALBUM, Entity.TRACK] as string[];
  return validEntities.includes(entity);
};
