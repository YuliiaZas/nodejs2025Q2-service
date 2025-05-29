import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './interfaces/artists-repository.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistsRepository')
    private readonly storage: ArtistsRepository,
  ) {}

  async addArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.storage.addArtist(createArtistDto);
  }

  async getArtists(): Promise<Artist[]> {
    return this.storage.getArtists();
  }

  async getArtist(id: string): Promise<Artist | null> {
    return this.storage.getArtist(id);
  }

  async deleteArtist(id: string): Promise<boolean> {
    return this.storage.deleteArtist(id);
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return this.storage.updateArtistFields(id, updateArtistDto);
  }

  async getArtistsByIds(ids: string[]): Promise<GetEntitiesByIdsType<Artist>> {
    return this.storage.getArtistsByIds(ids);
  }
}
