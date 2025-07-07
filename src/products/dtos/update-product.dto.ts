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
  @IsString({ message: 'description should be string' })
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  price?: number;
}
