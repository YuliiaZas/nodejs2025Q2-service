import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './interfaces/albums-repository.interface';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumsRepository')
    private readonly storage: AlbumsRepository,
  ) {}

  async addAlbum(createAlbumDto: CreateAlbumDto) {
    return this.storage.addAlbum(createAlbumDto);
  }

  async getAlbums() {
    return this.storage.getAlbums();
  }

  async getAlbum(id: string) {
    return this.storage.getAlbum(id);
  }

  async deleteAlbum(id: string) {
    return this.storage.deleteAlbum(id);
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.updateAlbumFields(id, updateAlbumDto);
  }
}
