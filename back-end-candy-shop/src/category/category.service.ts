import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {generateSlug} from 'src/utils/generate-slug';
import {CategoryDto} from './category.dto';
import {categoryReturnObject} from './return-category.object';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  // TODO Разобраться с типизацией
  async getByIdOrSlug({id, slug}: any) {

    const category = await this.prisma.category.findFirst({
      where: {
        OR: [{id}, {slug}]
      },
      select: categoryReturnObject
    })

    if (!category) {
      throw new NotFoundException('Категория не найдена')
    }
    return category
  }

  async getAll() {
    return this.prisma.category.findMany({
      select: categoryReturnObject
    })
  }


  async update(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name, {})
      }
    })
  }

  async create() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: ''
      }
    })
  }


  async delete(id: number) {
    await this.prisma.category.delete({
      where: {
        id
      }
    })
    // return {message: isExists ? 'Удален из избранного' : 'Успешно'}
  }
}
