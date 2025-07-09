import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  username?: string;
}
