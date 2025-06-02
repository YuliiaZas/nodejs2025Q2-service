import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  DeleteEventName,
  EntityName,
  MusicEntityActions,
  MusicEntityService,
  TOKEN_DATABASE,
} from '@/shared';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService extends MusicEntityService<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    @Inject(TOKEN_DATABASE[EntityName.ARTIST])
    protected readonly storage: MusicEntityActions<Artist, CreateArtistDto>,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(storage, eventEmitter, DeleteEventName.ARTIST);
  }
}
