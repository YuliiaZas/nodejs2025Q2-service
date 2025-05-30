import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { Album } from './entities/album.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { DeletedEvent } from 'src/shared/events/delete-event';
import type { IAlbumsDatabase } from './interfaces/albums-database.interface';

@Injectable()
export class AlbumsService extends MusicEntityService<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    @Inject('AlbumsDatabase')
    protected storage: IAlbumsDatabase,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(storage);
  }

  @OnEvent(DeleteEventName.ARTIST)
  async deleteArtistFromAlbums({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByArtistId(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return super.deleteById(id).then((result) => {
      if (result) {
        this.eventEmitter.emit(DeleteEventName.ALBUM, new DeletedEvent(id));
      }
      return result;
    });
  }
}
