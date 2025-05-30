import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { MusicEntity } from '../shared/types/music-entity.type';

@Injectable()
export class MusicEntityDatabase<
  T extends { id: string } = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
  UpdateDto = Partial<CreateDto>,
> implements MusicEntityActions<T, CreateDto, UpdateDto>
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

  async updateById(id: string, updatedFields: UpdateDto): Promise<T | null> {
    const musicEntity = await this.musicEntities.get(id);
    if (!musicEntity) {
      return Promise.resolve(null);
    }

    const updatedAlbum = {
      ...musicEntity,
      ...updatedFields,
    };

    return Promise.resolve(this.musicEntities.set(id, updatedAlbum)).then(
      () => updatedAlbum,
    );
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
