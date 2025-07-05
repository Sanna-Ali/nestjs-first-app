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
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
type ProductType = { id: number; title: string; price: number };
@Controller('api/products')
export class ProductsController {
  private products: ProductType[] = [
    { id: 1, title: 'kuli', price: 7 },
    { id: 2, title: 'Heft', price: 17 },
    { id: 3, title: 'Radiergummmi', price: 6 },
  ];
  // POST: ~/api/products
  @Post()
  public createNewProduct(
    @Body() //(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    body: CreateProductDto,
  ) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      title: body.title,
      price: body.price,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  // GET: ~/api/products
  @Get()
  public getAllProducts() {
    return this.products;
    // old first // return [
    //   { id: 1, title: 'kuli', price: 7 },
    //   { id: 2, title: 'Heft', price: 17 },
    //   { id: 3, title: 'Radiergummmi', price: 6 },
    // ];
  }
  // GET: ~/api/products/:id
  @Get('/:id')
  public getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    //(@Param() param: any) // object
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('product not found');
    console.log(id);
    return product;
  }
  // PUT: ~/api/products/:id
  @Put('/:id')
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto, //(new ValidationPipe()
  ) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('product not found');
    console.log(body);
    return { message: 'product updated sucessfully with id ' + id };
  }
  // Delete: ~/api/products/:id
  @Delete('/:id')
  public deleteProduct(@Param('id') id: string) {
    console.log(this.products);
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product) throw new NotFoundException('product not found');
    console.log(this.products);
    return { message: 'product deleted sucessfully with id ' + id };
  }
}
