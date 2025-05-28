import { IsNotEmpty, Length } from 'class-validator';

// export class UpdatePasswordDto extends PartialType(CreateUserDto) {
export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;
  @Length(4, 100)
  newPassword: string;
}
