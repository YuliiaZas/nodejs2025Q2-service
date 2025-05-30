import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class ArtistsDatabase extends MusicEntityDatabase<
  Artist,
  CreateArtistDto
> {}
