import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async getAll(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId
      }
    })
    return orders
  }
}
