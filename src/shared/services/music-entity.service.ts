import { Injectable } from '@nestjs/common';
import { MusicEntityActions } from '../interfaces/music-entity-actions.interface';
import { MusicEntity } from '../types/music-entity.type';
import { GetEntitiesByIdsType } from '../types/get-entities-by-ids.type';

@Injectable()
export abstract class MusicEntityService<
  T = MusicEntity,
  CreateDto = unknown,
  UpdateDto = Partial<CreateDto>,
> implements MusicEntityActions<T, CreateDto, UpdateDto>
{
  constructor(
    private readonly storage: MusicEntityActions<T, CreateDto, UpdateDto>,
  ) {}

  async add(createDto: CreateDto): Promise<T> {
    return this.storage.add(createDto);
  }

  async getAll(): Promise<T[]> {
    return this.storage.getAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.storage.getById(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.storage.deleteById(id);
  }

  async updateById(id: string, updateDto: UpdateDto): Promise<T | null> {
    return this.storage.updateById(id, updateDto);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<T>> {
    return this.storage.getByIds(ids);
  }
}
