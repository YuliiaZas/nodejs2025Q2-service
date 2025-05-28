import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { AlbumNotFoundException } from 'src/shared/exseptions/not-found.exseptions';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.addAlbum(createAlbumDto);
  }

  @Get()
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param() { id }: IdDto): Promise<Album> {
    return this.albumsService.getAlbum(id).then((album) => {
      if (!album) throw new AlbumNotFoundException(id);
      return album;
    });
  }

  @Put(':id')
  async updateAlbum(
    @Param() { id }: IdDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.updateAlbum(id, updateAlbumDto).then((album) => {
      if (!album) throw new AlbumNotFoundException(id);
      return album;
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: IdDto): Promise<void> {
    //TODO: Remove from tracks, artists
    return this.albumsService.deleteAlbum(id).then((deleted) => {
      if (!deleted) throw new AlbumNotFoundException(id);
      return;
    });
  }
}
