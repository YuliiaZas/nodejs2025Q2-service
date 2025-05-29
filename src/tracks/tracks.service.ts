import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './interfaces/tracks-repository.interface';
import { Track } from './entities/track.entity';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TracksRepository')
    private readonly storage: TracksRepository,
  ) {}

  async addTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.storage.addTrack(createTrackDto);
  }

  async getTracks(): Promise<Track[]> {
    return this.storage.getTracks();
  }

  async getTrack(id: string): Promise<Track | null> {
    return this.storage.getTrack(id);
  }

  async deleteTrack(id: string): Promise<boolean> {
    return this.storage.deleteTrack(id);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    return this.storage.updateTrackFields(id, updateTrackDto);
  }

  async getTracksByIds(ids: string[]): Promise<GetEntitiesByIdsType<Track>> {
    return this.storage.getTracksByIds(ids);
  }
}
