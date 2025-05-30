import { MusicEntity } from 'src/shared/types/music-entity.type';
import { Favorites } from '../entities/favorites.entity';
import { AddedFavorite } from '../entities/added-favorite.entity';

export type FavoritesStore = Map<MusicEntity, Set<string>>;

export interface FavoritesRepository {
  getAllFavorites(): Promise<FavoritesStore>;
  addToFavorites(id: string, entity: MusicEntity): Promise<boolean>;
  removeFromFavorites(id: string, entity: MusicEntity): Promise<boolean>;
}

export interface IFavoritesService {
  getAllFavorites(): Promise<Favorites>;
  addToFavorites(
    id: string,
    entity: MusicEntity,
  ): Promise<AddedFavorite | null>;
  removeFromFavorites(id: string, entity: MusicEntity): Promise<boolean>;
}
