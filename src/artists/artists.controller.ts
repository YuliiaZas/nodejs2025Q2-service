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
import { ArtistNotFoundException } from 'src/shared/exseptions/not-found.exseptions';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async addArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.addArtist(createArtistDto);
  }

  @Get()
  async getArtists(): Promise<Artist[]> {
    return this.artistsService.getArtists();
  }

  @Get(':id')
  async getArtist(@Param() { id }: IdDto): Promise<Artist> {
    return this.artistsService.getArtist(id).then((artist) => {
      if (!artist) throw new ArtistNotFoundException(id);
      return artist;
    });
  }

  @Put(':id')
  async updateArtist(
    @Param() { id }: IdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService
      .updateArtist(id, updateArtistDto)
      .then((artist) => {
        if (!artist) throw new ArtistNotFoundException(id);
        return artist;
      });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: IdDto): Promise<void> {
    //TODO: Remove from tracks, albums
    return this.artistsService.deleteArtist(id).then((deleted) => {
      if (!deleted) throw new ArtistNotFoundException(id);
      return;
    });
  }
}
