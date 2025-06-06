import { MusicEntity } from '../types/music-entity.type';

export interface MusicEntityActions<
  T = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
> {
  add(entity: CreateDto): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  getByIds(ids: string[]): Promise<T[]>;
}
