import { MusicEntityName } from '@/shared';

import { FavoritesIds } from './favorites-ids.interface';

export interface IFavoritesDatabase {
  getAll(): Promise<FavoritesIds>;
  addEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
  removeEntityId(id: string, entity: MusicEntityName): Promise<boolean>;
}
