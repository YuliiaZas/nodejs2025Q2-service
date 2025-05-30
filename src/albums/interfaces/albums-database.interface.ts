import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';

export interface IAlbumsDatabase
  extends MusicEntityActions<Album, CreateAlbumDto> {
  deleteByArtistId(artistId: string): Promise<void>;
}
