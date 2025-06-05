import { Injectable } from '@nestjs/common';

import { EntityName, PrismaService } from '@/shared';
import { CreateTrackDto, ITracksDatabase, Track } from '@/tracks';

import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class TracksDatabase
  extends MusicEntityDatabase<Track, CreateTrackDto>
  implements ITracksDatabase
{
  constructor(protected readonly prisma: PrismaService) {
    super(EntityName.TRACK, prisma);
  }

  async deleteByArtistId(artistId: string): Promise<void> {
    return this.getAll().then(async (tracks) => {
      for (const track of tracks) {
        if (track.artistId === artistId) {
          await this.update({ ...track, artistId: null });
        }
      }
    });
  }

  async deleteByAlbumId(albumId: string): Promise<void> {
    return this.getAll().then(async (tracks) => {
      for (const track of tracks) {
        if (track.albumId === albumId) {
          await this.update({ ...track, albumId: null });
        }
      }
    });
  }
}
