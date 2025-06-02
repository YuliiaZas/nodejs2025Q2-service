import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DeletedEvent } from '../events/delete-event';
import { MusicEntityActions } from '../interfaces/music-entity-actions.interface';
import { IMusicEntityService } from '../interfaces/music-entity-service.interface';
import { DeleteEventName } from '../types/delete-event-name.enum';
import { GetEntitiesByIdsType } from '../types/get-entities-by-ids.type';
import { MusicEntity } from '../types/music-entity.type';

@Injectable()
export abstract class MusicEntityService<
  T = MusicEntity,
  CreateDto extends Partial<Omit<T, 'id'>> = Partial<Omit<T, 'id'>>,
  UpdateDto = Partial<CreateDto>,
> implements IMusicEntityService<T, CreateDto, UpdateDto>
{
  constructor(
    protected readonly storage: MusicEntityActions<T, CreateDto>,
    protected readonly eventEmitter: EventEmitter2,
    private readonly deleteEventType: DeleteEventName,
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
    const entity = await this.getById(id);
    if (!entity) {
      return false;
    }

    return this.storage.deleteById(id).then((result) => {
      if (result) {
        this.emitDelteEvent(id);
      }
      return result;
    });
  }

  async updateById(id: string, updateDto: UpdateDto): Promise<T | null> {
    const entity = await this.getById(id);

    if (!entity) return null;
    if (Object.keys(updateDto).length === 0) return entity;

    const updatedEntity: T = {
      ...entity,
      ...updateDto,
    };

    return this.storage.update(updatedEntity);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<T>> {
    return this.storage.getByIds(ids);
  }

  private emitDelteEvent(id: string): void {
    this.eventEmitter.emit(this.deleteEventType, new DeletedEvent(id));
  }
}
