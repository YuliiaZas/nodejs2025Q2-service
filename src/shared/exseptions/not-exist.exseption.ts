import { UnprocessableEntityException } from '@nestjs/common';
import { Entity } from '../types/entity.enum';
import { getNotExistMessage } from '../utils/get-not-exist-message';

export class AppNotExistException extends UnprocessableEntityException {
  constructor(id: string, entity: Entity) {
    super(getNotExistMessage(id, entity));
  }
}
