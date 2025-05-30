import { Injectable } from '@nestjs/common';
import { MusicEntityDatabase } from './music-entity.database';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { Track } from 'src/tracks/entities/track.entity';
import { ITracksDatabase } from 'src/tracks/interfaces/tracks-database.interface';

@Injectable()
export class TracksDatabase
  extends MusicEntityDatabase<Track, CreateTrackDto>
  implements ITracksDatabase
{
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
