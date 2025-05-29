import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Beatles' })
  name: string;

  @ApiProperty({
    description: 'Specifies if the artist has a Grammy Award',
    example: false,
    type: Boolean,
  })
  grammy: boolean;
}
