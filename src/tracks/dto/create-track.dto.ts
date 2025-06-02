import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    example: 'Come Together',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 201,
  })
  @IsInt()
  @Min(0)
  duration: number;

  @ApiPropertyOptional({
    description: 'The artist ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'The album ID associated with the track',
    nullable: true,
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  albumId: string | null;
}
