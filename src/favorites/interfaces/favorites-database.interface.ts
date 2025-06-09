import { MusicEntityName } from '@/shared';

import { Favorites } from '../entities/favorites.entity';

export interface IFavoritesDatabase {
  getAll(): Promise<Favorites>;
  addEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
}
