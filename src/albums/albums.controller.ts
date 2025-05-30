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
import { AppNotFoundException } from 'src/shared/exseptions/not-found.exseption';
import { Album } from './entities/album.entity';
import { ApiOperation } from '@nestjs/swagger';
import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api204NoContentResponse,
  Api400BadRequestResponse,
  Api404NotFoundResponse,
} from 'src/shared/swagger/responses';
import { ApiIdParams } from 'src/shared/swagger/params';
import { Entity } from 'src/shared/types/entity.enum';

const ENTITY_NAME = Entity.ALBUM;

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new album',
    description:
      'This endpoint creates a new album with a name, year, and an optional artist ID.',
  })
  @Api201CreatedResponse(ENTITY_NAME, Album)
  @Api400BadRequestResponse([
    'name should not be empty',
    'year must not be greater than 2025',
    'year must not be less than 1900',
    'year must be an integer number',
  ])
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.addAlbum(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'This endpoint retrieves a list of all albums.',
  })
  @Api200OkResponse(ENTITY_NAME, [Album])
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an album by ID',
    description: 'This endpoint retrieves an album by its ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, Album)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async getAlbum(@Param() { id }: IdDto): Promise<Album> {
    return this.albumsService.getById(id).then((album) => {
      if (!album) throw new AppNotFoundException(id, ENTITY_NAME);
      return album;
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an album by ID',
    description:
      'This endpoint updates an existing album by its ID with new data.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse('The user password', Album, false, true)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async updateAlbum(
    @Param() { id }: IdDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.updateAlbum(id, updateAlbumDto).then((album) => {
      if (!album) throw new AppNotFoundException(id, ENTITY_NAME);
      return album;
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an album by ID',
    description: 'This endpoint deletes an album by its ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api204NoContentResponse(ENTITY_NAME)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteAlbum(@Param() { id }: IdDto): Promise<void> {
    //TODO: Remove from tracks, artists
    return this.albumsService.deleteAlbum(id).then((deleted) => {
      if (!deleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
