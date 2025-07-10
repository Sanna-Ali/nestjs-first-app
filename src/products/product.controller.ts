import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
  Put,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './product.service';
import { ConfigService } from '@nestjs/config';
import { AuthRolesGuard } from '../users/guards/auth-roles.guard'; //AuthRolesGuard
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Roles } from '../users/decorators/user-role.decorator';
import { JWTPayloadType } from 'src/utils/types';
import { UserType } from 'src/utils/enums';
import { title } from 'process';
@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly config: ConfigService,
  ) {}
  // POST: ~/api/products
  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public createNewProduct(
    @Body() //(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    body: CreateProductDto,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.productsService.createProduct(body, payload.id);
  }
  // GET: ~/api/products
  @Get()
  public getAllProducts(
    @Query('title') title: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    //@Query(title) title: string
    return this.productsService.getAll(title, minPrice, maxPrice);
  }
  // GET: ~/api/products/:id
  @Get('/:id')
  public getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getOneBy(id);
  }
  // PUT: ~/api/products/:id
  @Put('/:id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto, //(new ValidationPipe()
  ) {
    return this.productsService.update(id, body);
  }
  // Delete: ~/api/products/:id
  @Delete('/:id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
