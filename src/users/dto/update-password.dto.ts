import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'The old password of the user',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'NewPassword',
    minLength: 4,
    maxLength: 100,
    required: true,
  })
  @Length(4, 100)
  newPassword: string;
}
