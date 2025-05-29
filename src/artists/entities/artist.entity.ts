import { ApiPropertyOptional } from '@nestjs/swagger';

export class Artist {
  @ApiPropertyOptional({ format: 'uuid' })
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
