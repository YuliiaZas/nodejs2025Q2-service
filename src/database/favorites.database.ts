import { Injectable } from '@nestjs/common';

import { FavoritesStore, IFavoritesDatabase } from '@/favorites';
import { EntityName, MusicEntityName } from '@/shared';

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
