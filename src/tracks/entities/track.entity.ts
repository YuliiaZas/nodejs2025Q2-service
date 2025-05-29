import { ApiPropertyOptional } from '@nestjs/swagger';

export class Track {
  @ApiPropertyOptional({
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
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
  })
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'The album ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
  })
  albumId: string | null;
}
