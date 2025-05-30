import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { MusicEntityDatabase } from './music-entity.database';
import { IAlbumsDatabase } from 'src/albums/interfaces/albums-database.interface';

@Injectable()
export class AlbumsDatabase
  extends MusicEntityDatabase<Album, CreateAlbumDto>
  implements IAlbumsDatabase
{
  async deleteByArtistId(artistId: string): Promise<void> {
    return this.getAll().then(async (albums) => {
      for (const album of albums) {
        if (album.artistId === artistId) {
          await this.update({ ...album, artistId: null });
        }
      }
    });
  }
}
