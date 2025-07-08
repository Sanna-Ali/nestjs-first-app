import { CanActivate, Injectable } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';
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
  @IsString({ message: 'description should be string' })
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'price should not be less zero' })
  price: number;
}

@Injectable()
export class AuthGuard implements CanActivate {}
