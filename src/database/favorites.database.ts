import { Injectable } from '@nestjs/common';
import { IFavoritesDatabase } from 'src/favorites/interfaces/favorites-database.interface';
import { FavoritesStore } from 'src/favorites/interfaces/favorites-store.interface';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { MusicEntityName } from 'src/shared/types/music-entity-name.type';

@Injectable()
export class FavoritesDatabase implements IFavoritesDatabase {
  private readonly favorites: FavoritesStore = new Map();

  constructor() {
    this.favorites.set(EntityName.ARTIST, new Set());
    this.favorites.set(EntityName.ALBUM, new Set());
    this.favorites.set(EntityName.TRACK, new Set());
  }

  async getAll(): Promise<FavoritesStore> {
    return Promise.resolve(this.favorites);
  }

  async addEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      set.add(id);
      return true;
    });
  }

  async removeEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    return Promise.resolve(this.favorites.get(entity)).then((set) => {
      return set.delete(id);
    });
  }
}
