import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Like, Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UsersService } from 'src/users/users.service';
type ProductType = { id: number; title: string; price: number };
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly userService: UsersService,
  ) {}
  /**
   *
   * Create New Product
   */
  public async createProduct(
    //(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    dto: CreateProductDto,
    userId: number,
  ) {
    const user = await this.userService.getCurrentUser(userId);
    const newProduct = this.productsRepository.create({
      ...dto,
      user,
      title: dto.title,
    });

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
  public getAll(title?: string, minPrice?: string, maxPrice?: string) {
    // true async
    const filters = {
      ...(title ? { title: Like(`%${title.toLowerCase()}%`) } : {}),
      ...(minPrice && maxPrice
        ? { price: Between(parseInt(minPrice), parseInt(maxPrice)) }
        : {}),
    };
    return this.productsRepository.find({
      where: filters,
    }); // relations: { user: true, reviews: true } //title: Like(`%${title}%`
  }

  /**
   * Get One Product By Id
   */
  public async getOneBy(id: number) {
    //(@Param() param: any) // object
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { user: true, reviews: true },
    });
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
