import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

type ProductType = { id: number; title: string; price: number };
@Injectable()
export class ProductsService {
  private products: ProductType[] = [
    { id: 1, title: 'kuli', price: 7 },
    { id: 2, title: 'Heft', price: 17 },
    { id: 3, title: 'Radiergummmi', price: 6 },
  ];
  /**
   *
   * Create New Product
   */
  public createProduct(
    //(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    { title, price }: CreateProductDto,
  ) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      title,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   *
   * Get All Products
   */
  public getAll() {
    return this.products;
  }

  /**
   * Get One Product By Id
   */
  public getOneBy(id: number) {
    //(@Param() param: any) // object
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('product not found');
    console.log(id);
    return product;
  }

  /**
   * Update Product
   */

  public update(id: number, UpdateProductDto: UpdateProductDto) {
    //(new ValidationPipe()
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('product not found');
    console.log(UpdateProductDto);
    return { message: 'product updated sucessfully with id ' + id };
  }

  /**
   * Delete Product
   */
  public delete(id: string) {
    console.log(this.products);
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product) throw new NotFoundException('product not found');
    console.log(this.products);
    return { message: 'product deleted sucessfully with id ' + id };
  }
}
