import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID('4', { message: 'Invalid ID format. Must be a UUID v4' })
  id: string;
}
