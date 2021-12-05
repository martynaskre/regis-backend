import { Controller, Get } from '@nestjs/common';
import { formatResponse } from '../utils';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    const categories = await this.categoryService.getCategories();

    return formatResponse('Categories list.', categories);
  }
}
