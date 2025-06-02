import { MusicEntityActions } from '@/shared';

import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';

export interface ITracksDatabase
  extends MusicEntityActions<Track, CreateTrackDto> {
  deleteByArtistId(artistId: string): Promise<void>;
  deleteByAlbumId(albumId: string): Promise<void>;
}
