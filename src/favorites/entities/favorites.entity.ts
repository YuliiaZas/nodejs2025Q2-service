import { ApiPropertyOptional } from '@nestjs/swagger';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class Favorites {
  @ApiPropertyOptional({ type: Artist, isArray: true })
  artists: Artist[];

  @ApiPropertyOptional({ type: Album, isArray: true })
  albums: Album[];

  @ApiPropertyOptional({ type: Track, isArray: true })
  tracks: Track[];
}
