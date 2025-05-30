import { ApiPropertyOptional } from '@nestjs/swagger';
import { getIdExample } from 'src/shared/swagger/examples';
import { Entity } from 'src/shared/types/entity.enum';
import { MusicEntity } from 'src/shared/types/music-entity.type';

export class AddedFavorite {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    example: getIdExample(Entity.ARTIST),
    description: 'The unique identifier of the added favorite entity',
  })
  id: string;

  @ApiPropertyOptional({
    enum: [Entity.ARTIST, Entity.ALBUM, Entity.TRACK],
    example: Entity.ARTIST,
    description: 'The type of the added favorite entity',
  })
  type: MusicEntity;
}
