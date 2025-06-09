import { MusicEntityName } from '@/shared';

import { Favorites } from '../entities/favorites.entity';

export interface IFavoritesDatabase {
  getAll(): Promise<Favorites>;
  addEntity(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntity(id: string, entity: MusicEntityName): Promise<boolean>;
}
