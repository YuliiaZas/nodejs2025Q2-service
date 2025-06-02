import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { ArtistsService } from '@/artists';
import {
  AppNotExistException,
  DeletedEvent,
  DeleteEventName,
  EntityName,
  MusicEntityService,
  TOKEN_DATABASE,
} from '@/shared';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import type { IAlbumsDatabase } from './interfaces/albums-database.interface';

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
