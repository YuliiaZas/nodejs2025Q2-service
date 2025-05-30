import { Injectable } from '@nestjs/common';
import {
  FavoritesRepository,
  FavoritesStore,
} from 'src/favorites/interfaces/favorites-repository.interface';
import { Entity } from 'src/shared/types/entity.enum';
import { MusicEntity } from 'src/shared/types/music-entity.type';

@Injectable()
export class FavoritesDatabase implements FavoritesRepository {
  private readonly favorites: FavoritesStore = new Map();

  constructor() {
    this.favorites.set(Entity.ARTIST, new Set());
    this.favorites.set(Entity.ALBUM, new Set());
    this.favorites.set(Entity.TRACK, new Set());
  }

  async getAllFavorites(): Promise<FavoritesStore> {
    return Promise.resolve(this.favorites);
  }

  async addToFavorites(id: string, entity: MusicEntity): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      set.add(id);
      return true;
    });
  }

  async removeFromFavorites(id: string, entity: MusicEntity): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      return set.delete(id);
    });
  }
}
