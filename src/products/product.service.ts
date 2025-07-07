import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
type ProductType = { id: number; title: string; price: number };
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  /**
   *
   * Create New Product
   */
  public async createProduct(
    //(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    dto: CreateProductDto,
  ) {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
    // OLD
    // const newProduct: ProductType = {
    //   id: this.products.length + 1,
    //   title,
    //   price,
    // };
    // this.products.push(newProduct);
    // return newProduct;
  }

  /**
   *
   * Get All Products
   */
  public getAll() {
    // true async
    return this.productsRepository.find();
  }

  /**
   * Get One Product By Id
   */
  public async getOneBy(id: number) {
    //(@Param() param: any) // object
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('product not found');
    console.log(id);
    return product;
  }

  /**
   * Update Product
   */

  public async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getOneBy(id);
    product.title = updateProductDto.title ?? product.title;
    product.description = updateProductDto.description ?? product.description;
    product.price = updateProductDto.price ?? product.price;
    return this.productsRepository.save(product);
  }

  /**
   * Delete Product
   */
  public async delete(id: number) {
    const product = await this.getOneBy(id);
    await this.productsRepository.remove(product);
    return { message: 'product deleted sucessfully with id ' + id };
  }
}
