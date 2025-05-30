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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { AppNotFoundException } from 'src/shared/exseptions/not-found.exseption';
import { Artist } from './entities/artist.entity';
import { ApiOperation } from '@nestjs/swagger';
import { ApiIdParams } from 'src/shared/swagger/params';
import {
  Api200OkResponse,
  Api201CreatedResponse,
  Api204NoContentResponse,
  Api400BadRequestResponse,
  Api404NotFoundResponse,
} from 'src/shared/swagger/responses';
import { Entity } from 'src/shared/types/entity.enum';

const ENTITY_NAME = Entity.ARTIST;

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new artist',
    description:
      'This endpoint creates a new artist with a name and a flag if the artist has a Grammy Award.',
  })
  @Api201CreatedResponse(ENTITY_NAME, Artist)
  @Api400BadRequestResponse([
    'name should not be empty',
    'grammy must be a boolean value',
  ])
  async addArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.addArtist(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'This endpoint retrieves a list of all artists.',
  })
  @Api200OkResponse(ENTITY_NAME, [Artist])
  async getArtists(): Promise<Artist[]> {
    return this.artistsService.getArtists();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an artist by ID',
    description: 'This endpoint retrieves an artist by their ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, Artist)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async getArtist(@Param() { id }: IdDto): Promise<Artist> {
    return this.artistsService.getById(id).then((artist) => {
      if (!artist) throw new AppNotFoundException(id, ENTITY_NAME);
      return artist;
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an artist by ID',
    description: 'This endpoint updates an artist by their ID with new data.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse('The user password', Artist, false, true)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async updateArtist(
    @Param() { id }: IdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService
      .updateArtist(id, updateArtistDto)
      .then((artist) => {
        if (!artist) throw new AppNotFoundException(id, ENTITY_NAME);
        return artist;
      });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an artist by ID',
    description: 'This endpoint deletes an artist by their ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api204NoContentResponse(ENTITY_NAME)
  @Api400BadRequestResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteArtist(@Param() { id }: IdDto): Promise<void> {
    //TODO: Remove from tracks, albums
    return this.artistsService.deleteArtist(id).then((deleted) => {
      if (!deleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
