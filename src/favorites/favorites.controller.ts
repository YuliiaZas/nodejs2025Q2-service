import { Controller, Post, Param, Delete, HttpCode, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdDto } from 'src/shared/dto/id.dto';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { Favorites } from './entities/favorites.entity';
import { AppNotFoundException } from 'src/shared/exseptions/not-found.exseption';
import { AppNotExistException } from 'src/shared/exseptions/not-exist.exseption';
import { ApiOperation } from '@nestjs/swagger';
import { ApiIdParams } from 'src/shared/swagger/params';
import {
  Api400BadRequestResponse,
  Api404NotFoundResponse,
  Api422NotExistResponse,
} from 'src/shared/swagger/error-responses';
import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api204NoContentResponse,
} from 'src/shared/swagger/responses';
import { AddedFavorite } from './entities/added-favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'This endpoint retrieves all the favorites.',
  })
  @Api200OkResponse('The favorites', Favorites)
  async getAllFavorites(): Promise<Favorites> {
    return this.favoritesService.getAll();
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add a artist to favorites',
    description: 'This endpoint adds a artist to the favorites.',
  })
  @ApiIdParams(EntityName.ARTIST)
  @Api201CreatedResponse(EntityName.ARTIST, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(EntityName.ARTIST)
  async addArtistToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addEntityId(id, EntityName.ARTIST)
      .then((artist) => {
        if (!artist) {
          throw new AppNotExistException(id, EntityName.ARTIST);
        }
        return artist;
      });
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove a artist from favorites',
    description: 'This endpoint removes a artist from the favorites.',
  })
  @ApiIdParams(EntityName.ARTIST)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(EntityName.ARTIST, true)
  @Api404NotFoundResponse(EntityName.ARTIST, true)
  async removeArtistFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeEntityId(id, EntityName.ARTIST)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, EntityName.ARTIST, 'in favorites');
        }
        return;
      });
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add a album to favorites',
    description: 'This endpoint adds a album to the favorites.',
  })
  @ApiIdParams(EntityName.ALBUM)
  @Api201CreatedResponse(EntityName.ALBUM, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(EntityName.ALBUM)
  async addAlbumToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addEntityId(id, EntityName.ALBUM)
      .then((album) => {
        if (!album) {
          throw new AppNotExistException(id, EntityName.ALBUM);
        }
        return album;
      });
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove a album from favorites',
    description: 'This endpoint removes a album from the favorites.',
  })
  @ApiIdParams(EntityName.ALBUM)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(EntityName.ALBUM, true)
  @Api404NotFoundResponse(EntityName.ALBUM, true)
  async removeAlbumFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeEntityId(id, EntityName.ALBUM)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, EntityName.ALBUM, 'in favorites');
        }
        return;
      });
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add a track to favorites',
    description: 'This endpoint adds a track to the favorites.',
  })
  @ApiIdParams(EntityName.TRACK)
  @Api201CreatedResponse(EntityName.TRACK, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(EntityName.TRACK)
  async addTrackToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addEntityId(id, EntityName.TRACK)
      .then((track) => {
        if (!track) {
          throw new AppNotExistException(id, EntityName.TRACK);
        }
        return track;
      });
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove a track from favorites',
    description: 'This endpoint removes a track from the favorites.',
  })
  @ApiIdParams(EntityName.TRACK)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(EntityName.TRACK, true)
  @Api404NotFoundResponse(EntityName.TRACK, true)
  async removeTrackFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeEntityId(id, EntityName.TRACK)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, EntityName.TRACK, 'in favorites');
        }
        return;
      });
  }
}
