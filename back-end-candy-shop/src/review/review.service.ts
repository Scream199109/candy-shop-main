import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {reviewReturnObject} from './return-review.object';
import {ReviewDto} from './review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: reviewReturnObject
    })
  }


  async create(userId: number, dto: ReviewDto, productId: number) {

    const product = await this.prisma.product.findUnique({
      where: {id: productId}
    });

    if (!product) throw new NotFoundException('Такого товара не существует');

    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async getAverageValueByProductId(productId: number) {

    return this.prisma.review.aggregate({
      where: {productId},
      _avg: {rating: true}
    })
      .then(data => data._avg)
  }
}


