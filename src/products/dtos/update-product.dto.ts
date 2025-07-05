import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  Min,
  IsOptional,
} from 'class-validator';
export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  @IsOptional()
  title?: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  price?: number;
}
