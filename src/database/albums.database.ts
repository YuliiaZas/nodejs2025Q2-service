import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';

@Injectable()
export class AlbumsDatabase
  implements MusicEntityActions<Album, CreateAlbumDto, UpdateArtistDto>
{
  private albums: Map<string, Album> = new Map();

  async add(albumParams: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: randomUUID(),
      ...albumParams,
    };
    this.albums.set(album.id, album);
    return Promise.resolve(album);
  }

  async getAll(): Promise<Album[]> {
    return Promise.resolve(Array.from(this.albums.values()));
  }

  async getById(id: string): Promise<Album | null> {
    return Promise.resolve(this.albums.get(id));
  }

  async deleteById(id: string): Promise<boolean> {
    return Promise.resolve(this.albums.delete(id));
  }

  async updateById(
    id: string,
    updatedFields: UpdateArtistDto,
  ): Promise<Album | null> {
    const album = await this.albums.get(id);
    if (!album) {
      return Promise.resolve(null);
    }
    const updatedAlbum = {
      ...album,
      ...updatedFields,
    };
    await this.albums.set(id, updatedAlbum);
    return Promise.resolve(updatedAlbum);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<Album>> {
    const result: GetEntitiesByIdsType<Album> = {
      items: [],
      notFoundIds: [],
    };

    ids.forEach((id) => {
      const album = this.albums.get(id);
      if (album) {
        result.items.push(album);
      } else {
        result.notFoundIds.push(id);
      }
    });

    return Promise.resolve(result);
  }
}
