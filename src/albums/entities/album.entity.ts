import { ApiPropertyOptional } from '@nestjs/swagger';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { getIdExample } from 'src/shared/swagger/examples';

export class Album {
  @ApiPropertyOptional({
    format: 'uuid',
    example: getIdExample(EntityName.ALBUM),
  })
  id: string;

  @ApiPropertyOptional({ example: 'Abbey Road' })
  name: string;

  @ApiPropertyOptional({
    description: 'The year the album was released',
    example: 1969,
  })
  year: number;

  @ApiPropertyOptional({
    description: 'The artist ID associated with the album',
    nullable: true,
    type: String,
    format: 'uuid',
    example: getIdExample(EntityName.ARTIST),
  })
  artistId: string | null;
}
