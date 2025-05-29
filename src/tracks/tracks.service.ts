import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './interfaces/tracks-repository.interface';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TracksRepository')
    private readonly storage: TracksRepository,
  ) {}

  async addTrack(createTrackDto: CreateTrackDto) {
    return this.storage.addTrack(createTrackDto);
  }

  async getTracks() {
    return this.storage.getTracks();
  }

  async getTrack(id: string) {
    return this.storage.getTrack(id);
  }

  async deleteTrack(id: string) {
    return this.storage.deleteTrack(id);
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.updateTrackFields(id, updateTrackDto);
  }
}
