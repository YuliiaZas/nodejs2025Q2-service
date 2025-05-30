import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { Artist } from './entities/artist.entity';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { DeletedEvent } from 'src/shared/events/delete-event';

@Injectable()
export class ArtistsService extends MusicEntityService<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    @Inject('ArtistsDatabase')
    storage: MusicEntityActions<Artist, CreateArtistDto>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(storage);
  }

  async deleteById(id: string): Promise<boolean> {
    return super.deleteById(id).then((result) => {
      if (result) {
        this.eventEmitter.emit(DeleteEventName.ARTIST, new DeletedEvent(id));
      }
      return result;
    });
  }
}
