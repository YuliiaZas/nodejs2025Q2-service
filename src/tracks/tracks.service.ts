import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AlbumsService } from '@/albums';
import { ArtistsService } from '@/artists';
import {
  AppNotExistException,
  DeleteEventName,
  EntityName,
  MusicEntityActions,
  MusicEntityService,
  TOKEN_DATABASE,
} from '@/shared';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService extends MusicEntityService<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    @Inject(TOKEN_DATABASE[EntityName.TRACK])
    protected readonly storage: MusicEntityActions<Track, CreateTrackDto>,
    protected readonly eventEmitter: EventEmitter2,
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
  ) {
    super(storage, eventEmitter, DeleteEventName.TRACK);
  }
  async add(createDto: CreateTrackDto): Promise<Track> {
    if (createDto.artistId) {
      await this.validateArtistId(createDto.artistId);
    }
    if (createDto.albumId) {
      await this.validateAlbumId(createDto.albumId);
    }

    return super.add(createDto);
  }

  async updateById(
    id: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track | null> {
    if (updateDto.artistId) {
      await this.validateArtistId(updateDto.artistId);
    }
    if (updateDto.albumId) {
      await this.validateAlbumId(updateDto.albumId);
    }

    return super.updateById(id, updateDto);
  }

  private async validateArtistId(artistId: string): Promise<void> {
    const artist = await this.artistService.getById(artistId);
    if (!artist) {
      throw new AppNotExistException(artistId, EntityName.ARTIST);
    }
  }

  private async validateAlbumId(albumId: string): Promise<void> {
    const album = await this.albumService.getById(albumId);
    if (!album) {
      throw new AppNotExistException(albumId, EntityName.ALBUM);
    }
  }
}
