import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
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
    @Inject('ArtistsDatabase')
    protected readonly storage: MusicEntityActions<Artist, CreateArtistDto>,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(storage, eventEmitter, DeleteEventName.ARTIST);
  }
}
