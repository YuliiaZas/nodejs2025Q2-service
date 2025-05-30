import { ApiPropertyOptional } from '@nestjs/swagger';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { getIdExample } from 'src/shared/swagger/examples';

export class Artist {
  @ApiPropertyOptional({
    format: 'uuid',
    example: getIdExample(EntityName.ARTIST),
  })
  id: string;

  @ApiPropertyOptional({ example: 'The Beatles' })
  name: string;

  @ApiPropertyOptional({
    description: 'Specifies if the artist has a Grammy Award',
    example: false,
    type: Boolean,
  })
  grammy: boolean;
}
