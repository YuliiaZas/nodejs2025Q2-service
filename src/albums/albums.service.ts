import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './interfaces/albums-repository.interface';
import { GetEntitiesByIdsType } from 'src/shared/types/get-entities-by-ids.type';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumsRepository')
    private readonly storage: AlbumsRepository,
  ) {}

  async addAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.storage.addAlbum(createAlbumDto);
  }

  async getAlbums(): Promise<Album[]> {
    return this.storage.getAlbums();
  }

  async getById(id: string): Promise<Album | null> {
    return this.storage.getAlbum(id);
  }

  async deleteAlbum(id: string): Promise<boolean> {
    return this.storage.deleteAlbum(id);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    return this.storage.updateAlbumFields(id, updateAlbumDto);
  }

  async getAlbumsByIds(ids: string[]): Promise<GetEntitiesByIdsType<Album>> {
    return this.storage.getAlbumsByIds(ids);
  }
}
