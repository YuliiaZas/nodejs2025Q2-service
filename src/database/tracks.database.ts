import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { MusicEntityActions } from 'src/shared/interfaces/music-entity-actions.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class TracksDatabase
  implements MusicEntityActions<Track, CreateTrackDto, UpdateTrackDto>
{
  private tracks: Map<string, Track> = new Map();

  async add(trackParams: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: randomUUID(),
      ...trackParams,
    };
    this.tracks.set(track.id, track);
    return Promise.resolve(track);
  }

  async getAll(): Promise<Track[]> {
    return Promise.resolve(Array.from(this.tracks.values()));
  }

  async getById(id: string): Promise<Track | null> {
    return Promise.resolve(this.tracks.get(id));
  }

  async deleteById(id: string): Promise<boolean> {
    return Promise.resolve(this.tracks.delete(id));
  }

  async updateById(
    id: string,
    updatedFields: UpdateTrackDto,
  ): Promise<Track | null> {
    const track = await this.tracks.get(id);
    if (!track) {
      return Promise.resolve(null);
    }
    const updatedTrack = {
      ...track,
      ...updatedFields,
    };
    await this.tracks.set(id, updatedTrack);
    return Promise.resolve(updatedTrack);
  }

  async getByIds(ids: string[]): Promise<GetEntitiesByIdsType<Track>> {
    const result: GetEntitiesByIdsType<Track> = {
      items: [],
      notFoundIds: [],
    };

    ids.forEach((id) => {
      const track = this.tracks.get(id);
      if (track) {
        result.items.push(track);
      } else {
        result.notFoundIds.push(id);
      }
    });

    return Promise.resolve(result);
  }
}
