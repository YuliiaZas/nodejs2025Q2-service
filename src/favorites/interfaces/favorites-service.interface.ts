import { MusicEntityName } from '@/shared';

import { AddedFavorite } from '../entities/added-favorite.entity';
import { Favorites } from '../entities/favorites.entity';

export interface IFavoritesService {
  getAll(): Promise<Favorites>;
  addEntity(id: string, entity: MusicEntityName): Promise<AddedFavorite | null>;
  removeEntity(id: string, entity: MusicEntityName): Promise<boolean>;
}
