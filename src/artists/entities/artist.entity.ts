import { ApiPropertyOptional } from '@nestjs/swagger';

import { EntityName, getIdExample } from '@/shared';

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
