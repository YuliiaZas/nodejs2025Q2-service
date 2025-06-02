import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeletedEvent } from 'src/shared/events/delete-event';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import type { IAlbumsDatabase } from './interfaces/albums-database.interface';
import { TOKEN_DATABASE } from 'src/shared/tokens/databases';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { ArtistsService } from 'src/artists/artists.service';
import { AppNotExistException } from 'src/shared/exseptions/not-exist.exseption';

@Injectable()
export class AlbumsService extends MusicEntityService<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    @Inject(TOKEN_DATABASE[EntityName.ALBUM])
    protected readonly storage: IAlbumsDatabase,
    protected readonly eventEmitter: EventEmitter2,
    private readonly artistService: ArtistsService,
  ) {
    super(storage, eventEmitter, DeleteEventName.ALBUM);
  }

  @OnEvent(DeleteEventName.ARTIST)
  async deleteArtistFromAlbums({ id }: DeletedEvent): Promise<void> {
    await this.storage.deleteByArtistId(id);
  }

  async add(createDto: CreateAlbumDto): Promise<Album> {
    if (createDto.artistId) {
      await this.validateArtistId(createDto.artistId);
    }

    return super.add(createDto);
  }

  async updateById(
    id: string,
    updateDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    if (updateDto.artistId) {
      await this.validateArtistId(updateDto.artistId);
    }

    return super.updateById(id, updateDto);
  }

  private async validateArtistId(artistId: string): Promise<void> {
    const artist = await this.artistService.getById(artistId);
    if (!artist) {
      throw new AppNotExistException(artistId, EntityName.ARTIST);
    }
  }
}
