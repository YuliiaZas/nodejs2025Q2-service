import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { FavoritesStore } from './favorites-store.interface';

export interface FavoritesRepository {
  getAll(): Promise<FavoritesStore>;
  addEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
}
