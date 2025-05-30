import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { MusicEntityDatabase } from './music-entity.database';

@Injectable()
export class AlbumsDatabase extends MusicEntityDatabase<
  Album,
  CreateAlbumDto,
  UpdateArtistDto
> {}
