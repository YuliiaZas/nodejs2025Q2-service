import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api204NoContentResponse,
  Api400BadRequestResponse,
  Api401UnauthorizedResponse,
  Api404NotFoundResponse,
  Api422NotExistResponse,
  ApiIdParams,
  AppNotFoundException,
  EntityName,
  IdDto,
} from '@/shared';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

const ENTITY_NAME = EntityName.ALBUM;

@Controller('album')
@ApiBearerAuth('access-token')
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
  @Api401UnauthorizedResponse()
  @Api422NotExistResponse(EntityName.ARTIST)
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.add(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'This endpoint retrieves a list of all albums.',
  })
  @Api200OkResponse(ENTITY_NAME, [Album])
  @Api401UnauthorizedResponse()
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an album by ID',
    description: 'This endpoint retrieves an album by its ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, Album)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
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
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  @Api422NotExistResponse(EntityName.ARTIST)
  async updateAlbum(
    @Param() { id }: IdDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.updateById(id, updateAlbumDto).then((album) => {
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
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteAlbum(@Param() { id }: IdDto): Promise<void> {
    return this.albumsService.deleteById(id).then((deleted) => {
      if (!deleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
