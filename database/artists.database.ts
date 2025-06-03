import { Injectable } from '@nestjs/common';

import { Artist, CreateArtistDto } from '@/artists';

import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class ArtistsDatabase extends MusicEntityDatabase<
  Artist,
  CreateArtistDto
> {}
