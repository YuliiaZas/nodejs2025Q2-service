import { ApiPropertyOptional } from '@nestjs/swagger';

export class Album {
  @ApiPropertyOptional({ format: 'uuid' })
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
  })
  artistId: string | null;
}
