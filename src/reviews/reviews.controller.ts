import { Controller, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
//import {}
@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  // GET:~api/reviews
  @Get('/api/reviews')
  public getAllReviewws() {
    return this.reviewsService.getAll();
  }
}
