import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';

export interface TracksRepository {
  addTrack(track: CreateTrackDto): Promise<Track>;
  getTracks(): Promise<Track[]>;
  getTrack(id: string): Promise<Track | null>;
  deleteTrack(id: string): Promise<boolean>;
  updateTrackFields(
    id: string,
    updatedFields: Partial<Track>,
  ): Promise<Track | null>;
  getTracksByIds(ids: string[]): Promise<GetEntitiesByIdsType<Track>>;
}
