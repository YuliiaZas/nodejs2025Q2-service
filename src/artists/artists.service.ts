import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './interfaces/artists-repository.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistsRepository')
    private readonly storage: ArtistsRepository,
  ) {}

  async addArtist(createArtistDto: CreateArtistDto) {
    return this.storage.addArtist(createArtistDto);
  }

  async getArtists() {
    return this.storage.getArtists();
  }

  async getArtist(id: string) {
    return this.storage.getArtist(id);
  }

  async deleteArtist(id: string) {
    return this.storage.deleteArtist(id);
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.updateArtistFields(id, updateArtistDto);
  }
}
