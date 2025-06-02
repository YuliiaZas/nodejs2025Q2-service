import { ApiPropertyOptional } from '@nestjs/swagger';

import { Album } from '@/albums';
import { Artist } from '@/artists';
import { Track } from '@/tracks';

export class Favorites {
  @ApiPropertyOptional({ type: Artist, isArray: true })
  artists: Artist[];

  @ApiPropertyOptional({ type: Album, isArray: true })
  albums: Album[];

  @ApiPropertyOptional({ type: Track, isArray: true })
  tracks: Track[];
}
