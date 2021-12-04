import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategorySeeder implements Seeder {
  private categories = [
    {
      title: 'Grožio paslaugos',
      description: 'Kirpėjai, manikiūristai, masažistai, kitos SPA paslaugos.',
    },
    {
      title: 'Automechanika',
      description: 'Automechanikų paslaugos.',
    },
    {
      title: 'Santechnika',
      description: 'Santechnikų paslaugos.',
    },
    {
      title: 'Elektrotechnika',
      description: 'Elektrotechnikos specialistai.',
    },
    {
      title: 'Renginiai',
      description:
        'Renginių organizavimas, muzikantai, vestuvių organizavimas ir pan.',
    },
    {
      title: 'Kūrybinės paslaugos',
      description:
        'Grafinis dizainas, interjero dizainas, muzikos ir literatūros kūrimo paslaugos.',
    },
    {
      title: 'Konsultantų paslaugos',
      description: 'Finansininkai, teisininkai.',
    },
    {
      title: 'Ugdymas',
      description: 'Korepetitoriai, mokytojai ir pan.',
    },
    {
      title: 'Fizinis aktyvumas',
      description: 'Trenerių, mitybos specialistai.',
    },
    {
      title: 'Vaikų priežiūra',
      description: 'Auklės, akušerės.',
    },
  ];

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async seed(): Promise<any> {
    for (const category of this.categories) {
      const currentCategoryEntity = await this.categoryRepository.findOne({
        title: category.title,
      });

      if (!currentCategoryEntity) {
        const categoryEntity = this.categoryRepository.create({
          ...category,
        });

        await this.categoryRepository.save(categoryEntity);
      } else {
        await this.categoryRepository.save({
          id: currentCategoryEntity.id,
          ...category,
        });
      }
    }
  }

  async drop(): Promise<any> {
    return await this.categoryRepository.clear();
  }
}
