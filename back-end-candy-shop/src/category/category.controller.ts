import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {Category} from '@prisma/client';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {CategoryDto} from './category.dto';
import {CategoryService} from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: Pick<Category, 'slug'>) {
    return this.categoryService.getByIdOrSlug({slug})
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: Pick<Category, 'id'>) {
    return this.categoryService.getByIdOrSlug({id: +id})
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.update(+id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id)
  }
}
