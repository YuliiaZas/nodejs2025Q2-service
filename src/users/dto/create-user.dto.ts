import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  login: string;
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @Length(4, 100)
  password: string;
}
