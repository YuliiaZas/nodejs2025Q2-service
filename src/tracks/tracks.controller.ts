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

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksService } from './tracks.service';

const ENTITY_NAME = EntityName.TRACK;

@Controller('track')
@ApiBearerAuth('access-token')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new track',
    description:
      'This endpoint creates a new track with a name, year, and an optional artist ID.',
  })
  @Api201CreatedResponse(ENTITY_NAME, Track)
  @Api400BadRequestResponse([
    'name should not be empty',
    'year must not be greater than 2025',
    'year must not be less than 1900',
    'year must be an integer number',
  ])
  @Api401UnauthorizedResponse()
  @Api422NotExistResponse(EntityName.ARTIST, EntityName.ALBUM)
  async addTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.add(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'This endpoint retrieves a list of all tracks.',
  })
  @Api200OkResponse(ENTITY_NAME, [Track])
  @Api401UnauthorizedResponse()
  async getTracks(): Promise<Track[]> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an track by ID',
    description: 'This endpoint retrieves an track by its ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse(ENTITY_NAME, Track)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async getTrack(@Param() { id }: IdDto): Promise<Track> {
    return this.tracksService.getById(id).then((track) => {
      if (!track) throw new AppNotFoundException(id, ENTITY_NAME);
      return track;
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an track by ID',
    description:
      'This endpoint updates an existing track by its ID with new data.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api200OkResponse('The user password', Track, false, true)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  @Api422NotExistResponse(EntityName.ARTIST, EntityName.ALBUM)
  async updateTrack(
    @Param() { id }: IdDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.tracksService.updateById(id, updateTrackDto).then((track) => {
      if (!track) throw new AppNotFoundException(id, ENTITY_NAME);
      return track;
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an track by ID',
    description: 'This endpoint deletes an track by its ID.',
  })
  @ApiIdParams(ENTITY_NAME)
  @Api204NoContentResponse(ENTITY_NAME)
  @Api400BadRequestResponse()
  @Api401UnauthorizedResponse()
  @Api404NotFoundResponse(ENTITY_NAME)
  async deleteTrack(@Param() { id }: IdDto): Promise<void> {
    return this.tracksService.deleteById(id).then((deleted) => {
      if (!deleted) throw new AppNotFoundException(id, ENTITY_NAME);
      return;
    });
  }
}
