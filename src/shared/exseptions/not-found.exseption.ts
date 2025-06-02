import { NotFoundException } from '@nestjs/common';

import { EntityName } from '../types/entity-name.enum';
import { getNotFoundMessage } from '../utils/get-not-found-message';

export class AppNotFoundException extends NotFoundException {
  constructor(id: string, entity: EntityName, info?: string) {
    super(getNotFoundMessage(id, entity, info));
  }
}
