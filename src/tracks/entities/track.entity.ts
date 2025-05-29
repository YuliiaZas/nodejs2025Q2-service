import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity } from 'src/shared/entity.enum';
import { getIdExample } from 'src/shared/swagger/examples';

export class Track {
  @ApiPropertyOptional({
    format: 'uuid',
    example: getIdExample(Entity.TRACK),
  })
  id: string;

  @ApiPropertyOptional({ example: 'Come Together' })
  name: string;

  @ApiPropertyOptional({ example: 201 })
  duration: number;

  @ApiPropertyOptional({
    description: 'The artist ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
    example: getIdExample(Entity.ARTIST),
  })
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'The album ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
    example: getIdExample(Entity.ALBUM),
  })
  albumId: string | null;
}
