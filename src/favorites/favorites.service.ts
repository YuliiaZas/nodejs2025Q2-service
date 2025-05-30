import { Inject, Injectable } from '@nestjs/common';
import { FavoritesRepository } from './interfaces/favorites-repository.interface';
import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { Favorites } from './entities/favorites.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { validateMusicEntityName } from 'src/shared/utils/validate-music-entity-name';
import { AddedFavorite } from './entities/added-favorite.entity';
import { DeleteEventName } from 'src/shared/types/delete-event-name.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { DeletedEvent } from 'src/shared/events/delete-event';
import { IFavoritesService } from './interfaces/favorites-service.interface';

@Injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly storage: FavoritesRepository,
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
    const favs = await this.storage.getAll();

    const [artistsRes, albumsRes, tracksRes] = await Promise.all([
      this.artistsService.getByIds([...favs.get(EntityName.ARTIST)]),
      this.albumsService.getByIds([...favs.get(EntityName.ALBUM)]),
      this.tracksService.getByIds([...favs.get(EntityName.TRACK)]),
    ]);

    if (
      artistsRes.notFoundIds.length ||
      albumsRes.notFoundIds.length ||
      tracksRes.notFoundIds.length
    ) {
      await Promise.all([
        this.removeEntitiesByIds(artistsRes.notFoundIds, EntityName.ARTIST),
        this.removeEntitiesByIds(albumsRes.notFoundIds, EntityName.ALBUM),
        this.removeEntitiesByIds(tracksRes.notFoundIds, EntityName.TRACK),
      ]);
    }

    return {
      artists: artistsRes.items,
      albums: albumsRes.items,
      tracks: tracksRes.items,
    };
  }

  async addEntity(
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
      .addEntity(id, entity)
      .then(() => ({ id, type: entity }));
  }

  async removeEntity(id: string, entity: MusicEntityName): Promise<boolean> {
    if (!validateMusicEntityName(entity)) return Promise.resolve(false);
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

  private async removeEntitiesByIds(
    ids: string[],
    entity: MusicEntityName,
  ): Promise<boolean[]> {
    if (!ids.length || !validateMusicEntityName(entity)) {
      return Promise.resolve([]);
    }

    return Promise.all(ids.map((id) => this.storage.removeEntity(id, entity)));
  }
}
