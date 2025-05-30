import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { DeletedEvent } from 'src/shared/events/delete-event';
import type { ITracksDatabase } from './interfaces/tracks-database.interface';

@Injectable()
export class TracksService extends MusicEntityService<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    @Inject('TracksDatabase')
    protected storage: ITracksDatabase,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(storage);
  }

  @OnEvent(DeleteEventName.ARTIST)
  async deleteArtistFromTracks({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByArtistId(id);
  }

  @OnEvent(DeleteEventName.ALBUM)
  async deleteAlbumFromTracks({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByAlbumId(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return super.deleteById(id).then((result) => {
      if (result) {
        this.eventEmitter.emit(DeleteEventName.TRACK, new DeletedEvent(id));
      }
      return result;
    });
  }
}
