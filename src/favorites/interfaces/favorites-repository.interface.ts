import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { FavoritesStore } from './favorites-store.interface';

export interface FavoritesRepository {
  getAll(): Promise<FavoritesStore>;
  addEntity(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntity(id: string, entity: MusicEntityName): Promise<boolean>;
}
