import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(200)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  username: string;
}
