import { MusicEntityName } from '@/shared';

import { FavoritesStore } from './favorites-store.interface';

export interface IFavoritesDatabase {
  getAll(): Promise<FavoritesStore>;
  addEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
}
