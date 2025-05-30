import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { Artist } from './entities/artist.entity';
import { MusicEntityService } from 'src/shared/services/music-entity.service';

@Injectable()
export class ArtistsService extends MusicEntityService<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    @Inject('ArtistsDatabase')
    storage: MusicEntityActions<Artist, CreateArtistDto, UpdateArtistDto>,
  ) {
    super(storage);
  }
}
