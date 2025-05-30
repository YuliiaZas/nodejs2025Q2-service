import { ApiPropertyOptional } from '@nestjs/swagger';
import { getIdExample } from 'src/shared/swagger/examples';
import { EntityName } from 'src/shared/types/entity-name.enum';
import { MusicEntityName } from 'src/shared/types/music-entity-name.type';

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
