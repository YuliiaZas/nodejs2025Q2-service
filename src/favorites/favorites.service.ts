import { Inject, Injectable } from '@nestjs/common';
import {
  FavoritesRepository,
  IFavoritesService,
} from './interfaces/favorites-repository.interface';
import { MusicEntity } from 'src/shared/types/music-entity.type';
import { Favorites } from './entities/favorites.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Entity } from 'src/shared/types/entity.enum';
import { validateMusicEntity } from 'src/shared/utils/validate-music-entity';
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
      this.artistsService.getArtistsByIds([...favs.get(Entity.ARTIST)]),
      this.albumsService.getAlbumsByIds([...favs.get(Entity.ALBUM)]),
      this.tracksService.getTracksByIds([...favs.get(Entity.TRACK)]),
    ]);

    await Promise.all([
      this.removeFromFavoritesByIds(artistsRes.notFoundIds, Entity.ARTIST),
      this.removeFromFavoritesByIds(albumsRes.notFoundIds, Entity.ALBUM),
      this.removeFromFavoritesByIds(tracksRes.notFoundIds, Entity.TRACK),
    ]);

    return {
      artists: artistsRes.items,
      albums: albumsRes.items,
      tracks: tracksRes.items,
    };
  }

  async addToFavorites(
    id: string,
    entity: MusicEntity,
  ): Promise<AddedFavorite | null> {
    if (!validateMusicEntity(entity)) {
      throw new Error('Invalid music entity type');
    }
    const storage =
      entity === Entity.ARTIST
        ? this.artistsService
        : entity === Entity.ALBUM
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

  removeFromFavorites(id: string, entity: MusicEntity): Promise<boolean> {
    if (!validateMusicEntity(entity)) return Promise.resolve(false);
    return this.storage.removeFromFavorites(id, entity);
  }

  removeFromFavoritesByIds(
    ids: string[],
    entity: MusicEntity,
  ): Promise<boolean[]> {
    if (!ids.length || !validateMusicEntity(entity)) {
      return Promise.resolve([]);
    }

    return Promise.all(
      ids.map((id) => this.storage.removeFromFavorites(id, entity)),
    );
  }
}
