import { MusicEntity } from '../types/music-entity.type';

export interface IMusicEntityService<
  T = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
  UpdateDto = Partial<CreateDto>,
> {
  add(entity: CreateDto): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, updatedFields: UpdateDto): Promise<T | null>;
  getByIds(ids: string[]): Promise<T[]>;
}
