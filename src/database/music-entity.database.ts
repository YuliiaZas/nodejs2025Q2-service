import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import {
  GetEntitiesByIdsType,
  MusicEntity,
  MusicEntityActions,
} from '@/shared/';

@Injectable()
export class MusicEntityDatabase<
  T extends { id: string } = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
> implements MusicEntityActions<T, CreateDto>
{
  private musicEntities: Map<string, T> = new Map();

  async add(musicEntityParams: CreateDto): Promise<T> {
    const musicEntity: T = {
      id: randomUUID(),
      ...musicEntityParams,
    } as unknown as T;

    this.musicEntities.set(musicEntity.id, musicEntity);

    return Promise.resolve(musicEntity);
  }

  async getAll(): Promise<T[]> {
    return Promise.resolve(Array.from(this.musicEntities.values()));
  }

  async getById(id: string): Promise<T | null> {
    return Promise.resolve(this.musicEntities.get(id));
  }

  async deleteById(id: string): Promise<boolean> {
    return Promise.resolve(this.musicEntities.delete(id));
  }

  async update(musicEntity: T): Promise<T | null> {
    return Promise.resolve(
      this.musicEntities.set(musicEntity.id, musicEntity),
    ).then(() => musicEntity);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<T>> {
    const result: GetEntitiesByIdsType<T> = {
      items: [],
      notFoundIds: [],
    };

    ids.forEach((id) => {
      const musicEntity = this.musicEntities.get(id);
      if (musicEntity) {
        result.items.push(musicEntity);
      } else {
        result.notFoundIds.push(id);
      }
    });

    return Promise.resolve(result);
  }
}
