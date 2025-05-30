import { UnprocessableEntityException } from '@nestjs/common';
import { EntityName } from '../types/entity-name.enum';
import { getNotExistMessage } from '../utils/get-not-exist-message';

export class AppNotExistException extends UnprocessableEntityException {
  constructor(id: string, entity: EntityName) {
    super(getNotExistMessage(id, entity));
  }
}
