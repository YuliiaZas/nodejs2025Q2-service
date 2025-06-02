import { ApiPropertyOptional } from '@nestjs/swagger';

import { EntityName, getIdExample, MusicEntityName } from '@/shared';

export class AddedFavorite {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    example: getIdExample(EntityName.ARTIST),
    description: 'The unique identifier of the added favorite entity',
  })
  id: string;

  @ApiPropertyOptional({
    enum: [EntityName.ARTIST, EntityName.ALBUM, EntityName.TRACK],
    example: EntityName.ARTIST,
    description: 'The type of the added favorite entity',
  })
  type: MusicEntityName;
}
