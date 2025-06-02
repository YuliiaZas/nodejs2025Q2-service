import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

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
