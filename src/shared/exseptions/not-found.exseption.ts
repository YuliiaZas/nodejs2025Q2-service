import { NotFoundException } from '@nestjs/common';
import { getNotFoundMessage } from '../utils/get-not-found-message';
import { EntityName } from '../types/entity-name.enum';

export class AppNotFoundException extends NotFoundException {
  constructor(id: string, entity: EntityName, info?: string) {
    super(getNotFoundMessage(id, entity, info));
  }
}
