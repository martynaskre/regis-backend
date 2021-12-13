import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { BusinessService } from '../business/business.service';

@Injectable()
export class RatingService {
  private readonly logger = new Logger(RatingService.name);

  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly businessService: BusinessService,
  ) {}

  async rateBusiness(ratingData: CreateRatingDto) {
    this.logger.log('Rating business');

    const business = await this.businessService.getBusinessById(
      ratingData.businessId,
    );

    const rating = this.ratingRepository.create({
      ...ratingData,
      business,
    });

    await this.ratingRepository.save(rating);

    let avg = 0;

    const ratings = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.business = :id', { id: ratingData.businessId })
      .getMany();

    for (let x = 0; x < ratings.length; x++) avg += ratings[x].rating;

    await this.businessRepository.update(business.id, {
      rating: avg / ratings.length,
    });

    return avg / ratings.length;
  }
}
