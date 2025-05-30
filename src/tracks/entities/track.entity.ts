import { ApiPropertyOptional } from '@nestjs/swagger';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { getIdExample } from 'src/shared/swagger/examples';

export class Track {
  @ApiPropertyOptional({
    format: 'uuid',
    example: getIdExample(EntityName.TRACK),
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
    example: getIdExample(EntityName.ARTIST),
  })
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'The album ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
    example: getIdExample(EntityName.ALBUM),
  })
  albumId: string | null;
}
