import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { Album, AlbumsService } from '@/albums';
import { Artist, ArtistsService } from '@/artists';
import {
  DeletedEvent,
  DeleteEventName,
  EntityName,
  GetEntitiesByIdsType,
  MusicEntityName,
  TOKEN_DATABASE,
  validateMusicEntityName,
} from '@/shared';
import { Track, TracksService } from '@/tracks';

import { AddedFavorite } from './entities/added-favorite.entity';
import { Favorites } from './entities/favorites.entity';
import { IFavoritesDatabase } from './interfaces/favorites-database.interface';
import { FavoritesIds } from './interfaces/favorites-ids.interface';
import { IFavoritesService } from './interfaces/favorites-service.interface';

const NOT_EXIST_EVENT = 'favorets.notExist';

type AllEntities = [
  GetEntitiesByIdsType<Artist>,
  GetEntitiesByIdsType<Album>,
  GetEntitiesByIdsType<Track>,
];
@Injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject(TOKEN_DATABASE.favorites)
    private readonly storage: IFavoritesDatabase,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly eventEmitter: EventEmitter2,
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

  @OnEvent(NOT_EXIST_EVENT)
  async removeNotExistEntitiesIds(notExist: FavoritesIds): Promise<void> {
    this.removeEntitiesIds(notExist[EntityName.ARTIST], EntityName.ARTIST);
    this.removeEntitiesIds(notExist[EntityName.ALBUM], EntityName.ALBUM);
    this.removeEntitiesIds(notExist[EntityName.TRACK], EntityName.TRACK);
  }

  async getAll(): Promise<Favorites> {
    const favs = await this.storage.getAll();

    const { items, notFoundIds } = this.formatResult(
      await Promise.all([
        this.artistsService.getByIds([...favs.get(EntityName.ARTIST)]),
        this.albumsService.getByIds([...favs.get(EntityName.ALBUM)]),
        this.tracksService.getByIds([...favs.get(EntityName.TRACK)]),
      ]),
    );

    if (this.isObjectWithIds(notFoundIds)) {
      this.eventEmitter.emit(NOT_EXIST_EVENT, notFoundIds);
    }

    return items;
  }

  async addEntityId(
    id: string,
    entity: MusicEntityName,
  ): Promise<AddedFavorite | null> {
    if (!validateMusicEntityName(entity)) {
      throw new Error('Invalid music entity type');
    }
    const storage = this.getEntityService(entity);

    const item = await storage.getById(id);
    if (!item) return null;

    return this.storage
      .addEntityId(id, entity)
      .then(() => ({ id, type: entity }));
  }

  async removeEntityId(id: string, entity: MusicEntityName): Promise<boolean> {
    if (!validateMusicEntityName(entity)) return Promise.resolve(false);
    return this.storage.removeEntityId(id, entity);
  }

  private async removeEntitiesIds(
    ids: string[],
    entity: MusicEntityName,
  ): Promise<boolean[]> {
    if (!ids.length || !validateMusicEntityName(entity)) {
      return Promise.resolve([]);
    }

    return Promise.all(
      ids.map((id) => this.storage.removeEntityId(id, entity)),
    );
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

  private isObjectWithIds(obj: Record<string, string[]>): boolean {
    return Object.values(obj).some((ids) => ids.length);
  }

  private formatResult([artistsRes, albumsRes, tracksRes]: AllEntities): {
    items: Favorites;
    notFoundIds: FavoritesIds;
  } {
    return {
      items: {
        artists: artistsRes.items,
        albums: albumsRes.items,
        tracks: tracksRes.items,
      },
      notFoundIds: {
        [EntityName.ARTIST]: artistsRes.notFoundIds,
        [EntityName.ALBUM]: albumsRes.notFoundIds,
        [EntityName.TRACK]: tracksRes.notFoundIds,
      },
    };
  }
}
