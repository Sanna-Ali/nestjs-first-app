import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
export class CreateProductDto {
  @IsString({ message: 'title should be string' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  title: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'price should not be less zero' })
  price: number;
}
