import { NotFoundException } from '@nestjs/common';

export class AppNotFoundException extends NotFoundException {
  constructor(id: string, entity: string) {
    super(`${entity} with id ${id} not found`);
  }
}

export class UserNotFoundException extends AppNotFoundException {
  constructor(id: string) {
    super(id, 'User');
  }
}

export class ArtistNotFoundException extends AppNotFoundException {
  constructor(id: string) {
    super(id, 'Artist');
  }
}

export class AlbumNotFoundException extends AppNotFoundException {
  constructor(id: string) {
    super(id, 'Album');
  }
}

export class TrackNotFoundException extends AppNotFoundException {
  constructor(id: string) {
    super(id, 'Track');
  }
}
