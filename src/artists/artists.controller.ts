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
  ApiIdParams,
  AppNotFoundException,
  EntityName,
  IdDto,
} from '@/shared';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

const ENTITY_NAME = EntityName.ARTIST;

@Controller('artist')
@ApiBearerAuth('access-token')
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
  @Api401UnauthorizedResponse()
  async addArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.add(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'This endpoint retrieves a list of all artists.',
  })
  @Api200OkResponse(ENTITY_NAME, [Artist])
  @Api401UnauthorizedResponse()
  async getArtists(): Promise<Artist[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an artist by ID',
    description: 'This endpoint retrieves an artist by their ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, Artist)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
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
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async updateArtist(
    @Param() { id }: IdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService
      .updateById(id, updateArtistDto)
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
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteArtist(@Param() { id }: IdDto): Promise<void> {
    return this.artistsService.deleteById(id).then((deleted) => {
      if (!deleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
