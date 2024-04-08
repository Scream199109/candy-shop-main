import {Injectable, NotFoundException} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PaginationService} from 'src/pagination/pagination.service';
import {PrismaService} from 'src/prisma.service';
import {productReturnObject} from 'src/product/return-product.object';
import {generateSlug} from 'src/utils/generate-slug';
import {EnumProductSort, GetAllProductDto} from './dto/get-all.product.dto';
import {ProductDto} from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService, private paginationService: PaginationService) { }

  async getAll(dto: GetAllProductDto = {}) {
    const {sort, searchTerm} = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];
    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({price: 'asc'})
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({price: 'desc'})
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({createdAt: 'asc'})
    } else {
      prismaSort.push({createdAt: 'desc'})
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {
          category: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      ]
    } : {}

    const {perPage, skip} = this.paginationService.getPagination(dto);
    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: productReturnObject
    })
    return {products, length: await this.prisma.product.count({where: prismaSearchTermFilter})}
  }

  // TODO Разобраться с типизацией
  async getByIdOrSlug({id, slug}: any) {

    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{id}, {slug}]
      },
      select: productReturnObject
    })

    if (!product) throw new NotFoundException('Товар не найден')

    return product
  }


  async getByCategory(categorySlug: string) {

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: productReturnObject
    })

    if (!products) throw new NotFoundException('Товары не найдены')

    return products
  }


  async getSimilar(id: number) {
    const currentProduct = await this.getByIdOrSlug(id);
    if (!currentProduct) throw new NotFoundException('Текущий продукт не найден');

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: productReturnObject
    })

    if (!products) throw new NotFoundException('Товары не найдены')

    return products
  }

  async update(id: number, dto: ProductDto) {
    const {description, images, price, name, categoryId} = dto;

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId
      }
    });

    // Проверка на существование категории при апдейте продукта

    if (!category) throw new NotFoundException('Такой категории товара не существует');

    return this.prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        slug: generateSlug(name, {}),
        description,
        price,
        images,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        description: '',
        price: 0,
      }
    })
    return product.id
  }


  async delete(id: number) {
    await this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
