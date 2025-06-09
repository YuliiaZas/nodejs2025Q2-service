import { Injectable } from '@nestjs/common';

import { Album, CreateAlbumDto } from '@/albums';
import { EntityName, PrismaService } from '@/shared';

import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class AlbumsDatabase extends MusicEntityDatabase<Album, CreateAlbumDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(EntityName.ALBUM, prisma);
  }
}
