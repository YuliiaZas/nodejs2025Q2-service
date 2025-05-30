import { Controller, Post, Param, Delete, HttpCode, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdDto } from 'src/shared/dto/id.dto';
import { Entity } from 'src/shared/types/entity.enum';
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
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add a artist to favorites',
    description: 'This endpoint adds a artist to the favorites.',
  })
  @ApiIdParams(Entity.ARTIST)
  @Api201CreatedResponse(Entity.ARTIST, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(Entity.ARTIST)
  async addArtistToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addToFavorites(id, Entity.ARTIST)
      .then((artist) => {
        if (!artist) {
          throw new AppNotExistException(id, Entity.ARTIST);
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
  @ApiIdParams(Entity.ARTIST)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(Entity.ARTIST, true)
  @Api404NotFoundResponse(Entity.ARTIST, true)
  async removeArtistFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeFromFavorites(id, Entity.ARTIST)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, Entity.ARTIST, 'in favorites');
        }
        return;
      });
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add a album to favorites',
    description: 'This endpoint adds a album to the favorites.',
  })
  @ApiIdParams(Entity.ALBUM)
  @Api201CreatedResponse(Entity.ALBUM, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(Entity.ALBUM)
  async addAlbumToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addToFavorites(id, Entity.ALBUM)
      .then((album) => {
        if (!album) {
          throw new AppNotExistException(id, Entity.ALBUM);
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
  @ApiIdParams(Entity.ALBUM)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(Entity.ALBUM, true)
  @Api404NotFoundResponse(Entity.ALBUM, true)
  async removeAlbumFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeFromFavorites(id, Entity.ALBUM)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, Entity.ALBUM, 'in favorites');
        }
        return;
      });
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add a track to favorites',
    description: 'This endpoint adds a track to the favorites.',
  })
  @ApiIdParams(Entity.TRACK)
  @Api201CreatedResponse(Entity.TRACK, AddedFavorite, true)
  @Api400BadRequestResponse()
  @Api422NotExistResponse(Entity.TRACK)
  async addTrackToFavorites(@Param() { id }: IdDto): Promise<AddedFavorite> {
    return this.favoritesService
      .addToFavorites(id, Entity.TRACK)
      .then((track) => {
        if (!track) {
          throw new AppNotExistException(id, Entity.TRACK);
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
  @ApiIdParams(Entity.TRACK)
  @Api400BadRequestResponse()
  @Api204NoContentResponse(Entity.TRACK, true)
  @Api404NotFoundResponse(Entity.TRACK, true)
  async removeTrackFromFavorites(@Param() { id }: IdDto): Promise<void> {
    return this.favoritesService
      .removeFromFavorites(id, Entity.TRACK)
      .then((isRemoved) => {
        if (!isRemoved) {
          throw new AppNotFoundException(id, Entity.TRACK, 'in favorites');
        }
        return;
      });
  }
}
