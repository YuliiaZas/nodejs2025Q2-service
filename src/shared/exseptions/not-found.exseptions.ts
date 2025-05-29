import { NotFoundException } from '@nestjs/common';
import { getNotFoundMessage } from '../get-not-found-message';
import { Entity } from '../entity.enum';

export class AppNotFoundException extends NotFoundException {
  constructor(id: string, entity: Entity) {
    super(getNotFoundMessage(id, entity));
  }
}
