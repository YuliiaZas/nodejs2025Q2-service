import { ApiProperty } from '@nestjs/swagger';

import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description: 'JWT refresh token for obtaining new access tokens',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    format: 'token',
  })
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
