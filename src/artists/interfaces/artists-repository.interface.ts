import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from '../entities/artist.entity';

export interface ArtistsRepository {
  addArtist(artist: CreateArtistDto): Promise<Artist>;
  getArtists(): Promise<Artist[]>;
  getArtist(id: string): Promise<Artist | null>;
  deleteArtist(id: string): Promise<boolean>;
  updateArtistFields(
    id: string,
    updatedFields: Partial<Artist>,
  ): Promise<Artist | null>;
}
