import { Injectable } from '@nestjs/common';

import { Favorites, FavoritesKeys, IFavoritesDatabase } from '@/favorites';
import { MusicEntityName, PrismaService } from '@/shared';

const SINGLETON_ID = 'singleton';

@Injectable()
export class FavoritesDatabase implements IFavoritesDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Favorites> {
    return this.prisma.favorites.findUnique({
      where: { id: SINGLETON_ID },
      select: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
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
    const entityKey = (entity + 's') as keyof FavoritesKeys;

    return this.prisma.favorites
      .update({
        where: { id: SINGLETON_ID },
        data: {
          [entityKey]: {
            [isAdd ? 'connect' : 'disconnect']: { id },
          },
        },
      })
      .then(() => true)
      .catch(() => false);
  }
}
