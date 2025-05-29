import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistsRepository } from 'src/artists/interfaces/artists-repository.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';

@Injectable()
export class ArtistsDatabase implements ArtistsRepository {
  private artists: Map<string, Artist> = new Map();

  async addArtist(artistParams: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: randomUUID(),
      ...artistParams,
    };
    this.artists.set(artist.id, artist);
    return Promise.resolve(artist);
  }

  async getArtists(): Promise<Artist[]> {
    return Promise.resolve(Array.from(this.artists.values()));
  }

  async getArtist(id: string): Promise<Artist | null> {
    return Promise.resolve(this.artists.get(id));
  }

  async deleteArtist(id: string): Promise<boolean> {
    return Promise.resolve(this.artists.delete(id));
  }

  async updateArtistFields(
    id: string,
    updatedFields: Partial<Artist>,
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

  async getArtistsByIds(ids: string[]): Promise<GetEntitiesByIdsType<Artist>> {
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
