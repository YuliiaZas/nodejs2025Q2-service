import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Album, AlbumsService } from '@/albums';
import { Artist, ArtistsService } from '@/artists';
import {
  DeletedEvent,
  DeleteEventName,
  EntityName,
  MusicEntityName,
  TOKEN_DATABASE,
  validateMusicEntityName,
} from '@/shared';
import { Track, TracksService } from '@/tracks';

import { AddedFavorite } from './entities/added-favorite.entity';
import { Favorites } from './entities/favorites.entity';
import { IFavoritesDatabase } from './interfaces/favorites-database.interface';
import { IFavoritesService } from './interfaces/favorites-service.interface';

type AllEntities = [Artist[], Album[], Track[]];
@Injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject(TOKEN_DATABASE.favorites)
    private readonly storage: IFavoritesDatabase,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @OnEvent(DeleteEventName.ARTIST)
  async removeArtist({ id }: DeletedEvent): Promise<void> {
    await this.removeEntityId(id, EntityName.ARTIST);
  }

  @OnEvent(DeleteEventName.ALBUM)
  async removeAlbum({ id }: DeletedEvent): Promise<void> {
    await this.removeEntityId(id, EntityName.ALBUM);
  }

  @OnEvent(DeleteEventName.TRACK)
  async removeTrack({ id }: DeletedEvent): Promise<void> {
    await this.removeEntityId(id, EntityName.TRACK);
  }

  async getAll(): Promise<Favorites> {
    const favs = await this.storage.getAll();

    return this.formatResult(
      await Promise.all([
        this.artistsService.getByIds(favs.artistsIds),
        this.albumsService.getByIds(favs.albumsIds),
        this.tracksService.getByIds(favs.tracksIds),
      ]),
    );
  }

  async addEntityId(
    id: string,
    entity: MusicEntityName,
  ): Promise<AddedFavorite | null> {
    if (!validateMusicEntityName(entity)) {
      throw new Error('Invalid music entity type');
    }
    const entityStorage = this.getEntityService(entity);

    const item = await entityStorage.getById(id);
    if (!item) return null;

    return this.storage
      .addEntityId(id, entity)
      .then(() => ({ id, type: entity }));
  }

  async removeEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    if (!validateMusicEntityName(entity)) {
      throw new Error('Invalid music entity type');
    }
    return this.storage.removeEntityId(id, entity);
  }

  private getEntityService(
    entity: MusicEntityName,
  ): AlbumsService | ArtistsService | TracksService {
    switch (entity) {
      case EntityName.ARTIST:
        return this.artistsService;
      case EntityName.ALBUM:
        return this.albumsService;
      default:
        return this.tracksService;
    }
  }

  private formatResult([
    artistsRes,
    albumsRes,
    tracksRes,
  ]: AllEntities): Favorites {
    return {
      artists: artistsRes,
      albums: albumsRes,
      tracks: tracksRes,
    };
  }
}
