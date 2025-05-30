import { Inject, Injectable } from '@nestjs/common';
import {
  FavoritesRepository,
  IFavoritesService,
} from './interfaces/favorites-repository.interface';
import { MusicEntityName } from 'src/shared/types/music-entity-name.type';
import { Favorites } from './entities/favorites.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { validateMusicEntityName } from 'src/shared/utils/validate-music-entity-name';
import { AddedFavorite } from './entities/added-favorite.entity';

@Injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly storage: FavoritesRepository,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAllFavorites(): Promise<Favorites> {
    const favs = await this.storage.getAllFavorites();

    const [artistsRes, albumsRes, tracksRes] = await Promise.all([
      this.artistsService.getByIds([...favs.get(EntityName.ARTIST)]),
      this.albumsService.getByIds([...favs.get(EntityName.ALBUM)]),
      this.tracksService.getByIds([...favs.get(EntityName.TRACK)]),
    ]);

    await Promise.all([
      this.removeFromFavoritesByIds(artistsRes.notFoundIds, EntityName.ARTIST),
      this.removeFromFavoritesByIds(albumsRes.notFoundIds, EntityName.ALBUM),
      this.removeFromFavoritesByIds(tracksRes.notFoundIds, EntityName.TRACK),
    ]);

    return {
      artists: artistsRes.items,
      albums: albumsRes.items,
      tracks: tracksRes.items,
    };
  }

  async addToFavorites(
    id: string,
    entity: MusicEntityName,
  ): Promise<AddedFavorite | null> {
    if (!validateMusicEntityName(entity)) {
      throw new Error('Invalid music entity type');
    }
    const storage =
      entity === EntityName.ARTIST
        ? this.artistsService
        : entity === EntityName.ALBUM
          ? this.albumsService
          : this.tracksService;

    const item = await storage.getById(id);
    if (!item) {
      return null;
    }

    return this.storage
      .addToFavorites(id, entity)
      .then(() => ({ id, type: entity }));
  }

  removeFromFavorites(id: string, entity: MusicEntityName): Promise<boolean> {
    if (!validateMusicEntityName(entity)) return Promise.resolve(false);
    return this.storage.removeFromFavorites(id, entity);
  }

  removeFromFavoritesByIds(
    ids: string[],
    entity: MusicEntityName,
  ): Promise<boolean[]> {
    if (!ids.length || !validateMusicEntityName(entity)) {
      return Promise.resolve([]);
    }

    return Promise.all(
      ids.map((id) => this.storage.removeFromFavorites(id, entity)),
    );
  }
}
