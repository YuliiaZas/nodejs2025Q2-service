import { GetEntitiesByIdsType } from '../types/get-entities-by-ids.type';
import { MusicEntity } from '../types/music-entity.type';

export interface MusicEntityActions<
  T = MusicEntity,
  CreateDto = unknown,
  UpdateDto = Partial<CreateDto>,
> {
  add(entity: CreateDto): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, updatedFields: UpdateDto): Promise<T | null>;
  getByIds(ids: string[]): Promise<GetEntitiesByIdsType<T>>;
}
