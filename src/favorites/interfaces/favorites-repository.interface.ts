import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { Favorites } from '../entities/favorites.entity';
import { AddedFavorite } from '../entities/added-favorite.entity';

export type FavoritesStore = Map<MusicEntityName, Set<string>>;

export interface FavoritesRepository {
  getAllFavorites(): Promise<FavoritesStore>;
  addToFavorites(id: string, entity: MusicEntityName): Promise<boolean>;
  removeFromFavorites(id: string, entity: MusicEntityName): Promise<boolean>;
}

export interface IFavoritesService {
  getAllFavorites(): Promise<Favorites>;
  addToFavorites(
    id: string,
    entity: MusicEntityName,
  ): Promise<AddedFavorite | null>;
  removeFromFavorites(id: string, entity: MusicEntityName): Promise<boolean>;
}
