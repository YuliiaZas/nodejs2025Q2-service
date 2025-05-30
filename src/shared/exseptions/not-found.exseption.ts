import { NotFoundException } from '@nestjs/common';
import { getNotFoundMessage } from '../utils/get-not-found-message';
import { Entity } from '../types/entity.enum';

export class AppNotFoundException extends NotFoundException {
  constructor(id: string, entity: Entity, info?: string) {
    super(getNotFoundMessage(id, entity, info));
  }
}
