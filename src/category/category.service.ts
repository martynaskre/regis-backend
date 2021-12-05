import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories() {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .select([
        'category.id',
        'category.title',
        'category.slug',
        'category.description',
        'category.illustrationUrl',
      ])
      .getMany();
  }
}
