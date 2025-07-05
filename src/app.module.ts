import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ProductsModule, ReviewsModule, UsersModule],
  exports: [],
  providers: [],
  controllers: [],
})
export class AppModule {}
