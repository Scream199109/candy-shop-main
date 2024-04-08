import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {CurrentUser} from 'src/auth/decorators/user.decorator';
import {ReviewDto} from './review.dto';
import {ReviewService} from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @Get()
  async getBySlug(@Param('productId') productId: number) {
    return this.reviewService.getAverageValueByProductId(productId)
  }

  @UsePipes(new ValidationPipe())
  @Post('leave/:productId')
  @Auth()
  async leaveReview(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: number
  ) {
    return this.reviewService.create(id, dto, +productId)
  }

  @Get('average-by-product/:productId')
  async getAverageByProduct(@Param('productOd') productId: string) {
    return this.reviewService.getAverageValueByProductId(+productId)
  }
}
