import { Injectable } from '@nestjs/common';

import { Artist, CreateArtistDto } from '@/artists';
import { EntityName, PrismaService } from '@/shared';

import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class ArtistsDatabase extends MusicEntityDatabase<
  Artist,
  CreateArtistDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(EntityName.ARTIST, prisma);
  }
}
