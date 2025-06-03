import { Injectable } from '@nestjs/common';

import { Album, CreateAlbumDto, IAlbumsDatabase } from '@/albums';

import { MusicEntityDatabase } from './music-entity.database';

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
