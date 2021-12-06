import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { formatFrontUrl } from '../utils';
import { FrontEndpoint } from '../types';

@Injectable()
export class CategorySeeder implements Seeder {
  private categories = [
    {
      title: 'Grožio paslaugos',
      description: 'Kirpėjai, manikiūristai, masažistai, kitos SPA paslaugos.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}beauty-services.jpeg`,
    },
    {
      title: 'Automechanika',
      description: 'Automechanikų paslaugos.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}mechanical-services.jpeg`,
    },
    {
      title: 'Santechnika',
      description: 'Santechnikų paslaugos.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}plumbing-services.jpeg`,
    },
    {
      title: 'Elektrotechnika',
      description: 'Elektrotechnikos specialistai.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}electrical-services.jpeg`,
    },
    {
      title: 'Renginiai',
      description:
        'Renginių organizavimas, muzikantai, vestuvių organizavimas ir pan.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}event-services.jpeg`,
    },
    {
      title: 'Kūrybinės paslaugos',
      description:
        'Grafinis dizainas, interjero dizainas, muzikos ir literatūros kūrimo paslaugos.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}creation-services.jpeg`,
    },
    {
      title: 'Konsultantų paslaugos',
      description: 'Finansininkai, teisininkai.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}consulting-services.jpeg`,
    },
    {
      title: 'Ugdymas',
      description: 'Korepetitoriai, mokytojai ir pan.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}educational-services.jpeg`,
    },
    {
      title: 'Fizinis aktyvumas',
      description: 'Trenerių, mitybos specialistai.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}sports-services.jpeg`,
    },
    {
      title: 'Vaikų priežiūra',
      description: 'Auklės, akušerės.',
      illustrationUrl: `${formatFrontUrl(
        FrontEndpoint.CATEGORY_ILLUSTRATIONS,
      )}care-services.jpeg`,
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
