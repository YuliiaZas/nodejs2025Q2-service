import { MusicEntityActions } from '@/shared';

import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

export interface IAlbumsDatabase
  extends MusicEntityActions<Album, CreateAlbumDto> {
  deleteByArtistId(artistId: string): Promise<void>;
}
