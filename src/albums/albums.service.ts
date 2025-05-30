import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeletedEvent } from 'src/shared/events/delete-event';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import type { IAlbumsDatabase } from './interfaces/albums-database.interface';

@Injectable()
export class AlbumsService extends MusicEntityService<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    @Inject('AlbumsDatabase')
    protected readonly storage: IAlbumsDatabase,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(storage, eventEmitter, DeleteEventName.ALBUM);
  }

  @OnEvent(DeleteEventName.ARTIST)
  async deleteArtistFromAlbums({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByArtistId(id);
  }
}
