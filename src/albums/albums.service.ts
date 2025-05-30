import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { MusicEntityService } from 'src/shared/services/music-entity.service';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService extends MusicEntityService<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    @Inject('AlbumsDatabase')
    storage: MusicEntityActions<Album, CreateAlbumDto, UpdateAlbumDto>,
  ) {
    super(storage);
  }
}
