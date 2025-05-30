import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { MusicEntityService } from 'src/shared/services/music-entity.service';

@Injectable()
export class TracksService extends MusicEntityService<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    @Inject('TracksDatabase')
    storage: MusicEntityActions<Track, CreateTrackDto, UpdateTrackDto>,
  ) {
    super(storage);
  }
}
