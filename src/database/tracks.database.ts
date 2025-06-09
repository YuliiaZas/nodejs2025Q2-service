import { Injectable } from '@nestjs/common';

import { EntityName, PrismaService } from '@/shared';
import { CreateTrackDto, Track } from '@/tracks';

import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class TracksDatabase extends MusicEntityDatabase<Track, CreateTrackDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(EntityName.TRACK, prisma);
  }
}
