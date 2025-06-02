import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeletedEvent } from 'src/shared/events/delete-event';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import type { ITracksDatabase } from './interfaces/tracks-database.interface';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';

@Injectable()
export class TracksService extends MusicEntityService<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    @Inject(TOKEN_DATABASE[EntityName.TRACK])
    protected readonly storage: ITracksDatabase,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(storage, eventEmitter, DeleteEventName.TRACK);
  }

  @OnEvent(DeleteEventName.ARTIST)
  async deleteArtistFromTracks({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByArtistId(id);
  }

  @OnEvent(DeleteEventName.ALBUM)
  async deleteAlbumFromTracks({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByAlbumId(id);
  }
}
