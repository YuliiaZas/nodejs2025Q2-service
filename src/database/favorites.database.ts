import { Injectable } from '@nestjs/common';

import { Favorites, FavoritesKeys, IFavoritesDatabase } from '@/favorites';
import { MusicEntityName, PrismaService } from '@/shared';

const SINGLETON_ID = 'singleton';

@Injectable()
export class FavoritesDatabase implements IFavoritesDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Favorites> {
    return this.prisma.favorites
      .findUnique({
        where: { id: SINGLETON_ID },
        select: {
          artists: true,
          albums: true,
          tracks: true,
        },
      })
      .then((favorites) => {
        if (!favorites) {
          return this.prisma.favorites.create({
            data: {
              id: SINGLETON_ID,
              artists: { connect: [] },
              albums: { connect: [] },
              tracks: { connect: [] },
            },
            select: {
              artists: true,
              albums: true,
              tracks: true,
            },
          });
        }
        return favorites;
      })
      .then((favorites) => {
        if (!favorites) {
          throw new Error('Failed to create favorites');
        }
        return favorites;
      })
      .catch((error) => {
        console.error('Error fetching or creating favorites:', error);
        throw new Error('Database operation failed');
      });
  }

  async addEntity(id: string, entity: MusicEntityName): Promise<boolean> {
    return this.updateEntity(id, entity, true);
  }

  async removeEntity(id: string, entity: MusicEntityName): Promise<boolean> {
    return this.updateEntity(id, entity, false);
  }

  private async updateEntity(
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
