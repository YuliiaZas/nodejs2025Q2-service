import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    example: 'Abbey Road',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    example: 1969,
  })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @ApiPropertyOptional({
    description: 'The artist ID associated with the album',
    nullable: true,
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
