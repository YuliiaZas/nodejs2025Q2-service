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
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
