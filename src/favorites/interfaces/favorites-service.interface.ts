import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { Favorites } from '../entities/favorites.entity';
import { AddedFavorite } from '../entities/added-favorite.entity';

export interface IFavoritesService {
  getAll(): Promise<Favorites>;
  addEntity(id: string, entity: MusicEntityName): Promise<AddedFavorite | null>;
  removeEntity(id: string, entity: MusicEntityName): Promise<boolean>;
}
