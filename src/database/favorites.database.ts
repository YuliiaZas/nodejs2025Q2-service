import { Injectable } from '@nestjs/common';
import {
  FavoritesRepository,
  FavoritesStore,
} from 'src/favorites/interfaces/favorites-repository.interface';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { MusicEntityName } from 'src/shared/types/music-entity-name.type';

@Injectable()
export class FavoritesDatabase implements FavoritesRepository {
  private readonly favorites: FavoritesStore = new Map();

  constructor() {
    this.favorites.set(EntityName.ARTIST, new Set());
    this.favorites.set(EntityName.ALBUM, new Set());
    this.favorites.set(EntityName.TRACK, new Set());
  }

  async getAllFavorites(): Promise<FavoritesStore> {
    return Promise.resolve(this.favorites);
  }

  async addToFavorites(id: string, entity: MusicEntityName): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      set.add(id);
      return true;
    });
  }

  async removeFromFavorites(id: string, entity: MusicEntityName): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      return set.delete(id);
    });
  }
}
