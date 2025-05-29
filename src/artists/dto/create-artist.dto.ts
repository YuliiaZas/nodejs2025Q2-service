import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'The Beatles',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Specifies if the artist has a Grammy Award',
    example: false,
    type: Boolean,
  })
  @IsBoolean()
  grammy: boolean;
}
