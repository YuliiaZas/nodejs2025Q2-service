import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';

@Injectable()
export class ArtistsDatabase
  implements MusicEntityActions<Artist, CreateArtistDto, UpdateArtistDto>
{
  private artists: Map<string, Artist> = new Map();

  async add(artistParams: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: randomUUID(),
      ...artistParams,
    };
    this.artists.set(artist.id, artist);
    return Promise.resolve(artist);
  }

  async getAll(): Promise<Artist[]> {
    return Promise.resolve(Array.from(this.artists.values()));
  }

  async getById(id: string): Promise<Artist | null> {
    return Promise.resolve(this.artists.get(id));
  }

  async deleteById(id: string): Promise<boolean> {
    return Promise.resolve(this.artists.delete(id));
  }

  async updateById(
    id: string,
    updatedFields: UpdateArtistDto,
  ): Promise<Artist | null> {
    const artist = await this.artists.get(id);
    if (!artist) {
      return Promise.resolve(null);
    }
    const updatedArtist = {
      ...artist,
      ...updatedFields,
    };
    await this.artists.set(id, updatedArtist);
    return Promise.resolve(updatedArtist);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<Artist>> {
    const result: GetEntitiesByIdsType<Artist> = {
      items: [],
      notFoundIds: [],
    };

    ids.forEach((id) => {
      const artist = this.artists.get(id);
      if (artist) {
        result.items.push(artist);
      } else {
        result.notFoundIds.push(id);
      }
    });

    return Promise.resolve(result);
  }
}
