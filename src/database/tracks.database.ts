import { Injectable } from '@nestjs/common';
import { MusicEntityDatabase } from './music-entity.database';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class TracksDatabase extends MusicEntityDatabase<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {}
