import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';

export interface ITracksDatabase
  extends MusicEntityActions<Track, CreateTrackDto> {
  deleteByArtistId(artistId: string): Promise<void>;
  deleteByAlbumId(albumId: string): Promise<void>;
}
