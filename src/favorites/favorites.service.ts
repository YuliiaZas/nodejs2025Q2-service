import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AlbumsService } from '@/albums';
import { ArtistsService } from '@/artists';
import {
  DeletedEvent,
  DeleteEventName,
  EntityName,
  MusicEntityName,
  TOKEN_DATABASE,
  validateMusicEntityName,
} from '@/shared';
import { TracksService } from '@/tracks';

import { AddedFavorite } from './entities/added-favorite.entity';
import { Favorites } from './entities/favorites.entity';
import { IFavoritesDatabase } from './interfaces/favorites-database.interface';
import { IFavoritesService } from './interfaces/favorites-service.interface';

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
    await this.removeEntity(id, EntityName.ARTIST);
  }

  @OnEvent(DeleteEventName.ALBUM)
  async removeAlbum({ id }: DeletedEvent): Promise<void> {
    await this.removeEntity(id, EntityName.ALBUM);
  }

  @OnEvent(DeleteEventName.TRACK)
  async removeTrack({ id }: DeletedEvent): Promise<void> {
    await this.removeEntity(id, EntityName.TRACK);
  }

  async getAll(): Promise<Favorites> {
    return this.storage.getAll();
  }

  async addEntity(
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
      .addEntity(id, entity)
      .then(() => ({ id, type: entity }));
  }

  async removeEntity(id: string, entity: MusicEntityName): Promise<boolean> {
    if (!validateMusicEntityName(entity)) {
      throw new Error('Invalid music entity type');
    }
    return this.storage.removeEntity(id, entity);
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
}
