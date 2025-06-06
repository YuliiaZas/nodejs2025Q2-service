import { Injectable } from '@nestjs/common';

import { FavoritesIds, IFavoritesDatabase } from '@/favorites';
import { MusicEntityName, PrismaService } from '@/shared';

const EMPTY_FAVORITES: FavoritesIds = {
  artistsIds: [],
  albumsIds: [],
  tracksIds: [],
};
const SINGLETON_ID = 'singleton';

@Injectable()
export class FavoritesDatabase implements IFavoritesDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<FavoritesIds> {
    return this.prisma.favorites
      .findUnique({
        where: { id: SINGLETON_ID },
        select: {
          artistsIds: true,
          albumsIds: true,
          tracksIds: true,
        },
      })
      .then((favs) => favs ?? EMPTY_FAVORITES);
  }

  async addEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    return this.updateEntityIds(id, entity, true);
  }

  async removeEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    return this.updateEntityIds(id, entity, false);
  }

  private async updateEntityIds(
    id: string,
    entity: MusicEntityName,
    isAdd: boolean,
  ): Promise<boolean> {
    const entityIdsName = (entity + 'sIds') as keyof FavoritesIds;

    const entitiesIds: string[] =
      (await this.prisma.favorites.findUnique({
        where: { id: SINGLETON_ID },
        select: { [entityIdsName]: true },
      })?.[entityIdsName]) || [];

    const updateEntitiesIds = isAdd
      ? Array.from(new Set([...entitiesIds, id]))
      : entitiesIds.filter((entityId) => id !== entityId);

    if (!isAdd && updateEntitiesIds.length === entitiesIds.length) {
      return false;
    }

    return this.prisma.favorites
      .upsert({
        where: { id: SINGLETON_ID },
        update: { [entityIdsName]: updateEntitiesIds },
        create: {
          id: SINGLETON_ID,
          ...EMPTY_FAVORITES,
          ...{ [entityIdsName]: updateEntitiesIds },
        },
      })
      .then(() => true)
      .catch(() => false);
  }
}
