import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import '../utils/typeormExtras';
import { Service } from '../service/service.entity';
import { ClientBooking } from '../booking/clientBooking.entity';
import { throwNotFound } from '../utils';

@Injectable()
export class RatingService {
  private readonly logger = new Logger(RatingService.name);

  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(ClientBooking)
    private readonly clientBookingsRepository: Repository<ClientBooking>,
  ) {}

  async getBusinessByUuid(uuid: string) {
    return await this.businessRepository
      .createQueryBuilder('business')
      .whereExists(
        this.servicesRepository
          .createQueryBuilder('service')
          .where('service.business = business.id')
          .andWhereExists(
            this.clientBookingsRepository
              .createQueryBuilder('clientBooking')
              .where('clientBooking.uuid = :uuid', {
                uuid,
              })
              .andWhere('clientBooking.service = service.id'),
          ),
      )
      .getOne();
  }

  async getBusinessAndServiceWithUuid(uuid: string) {
    return await this.clientBookingsRepository.createQueryBuilder('clientBooking')
      .where('clientBooking.uuid = :uuid', { uuid })
      .leftJoinAndSelect('clientBooking.service', 'service')
      .leftJoinAndSelect('service.business', 'business')
      .getOne();
  }

  async rateBusiness(uuid: string, ratingData: CreateRatingDto) {
    this.logger.log('Rating business');

    const business = await this.getBusinessByUuid(uuid);

    if (!business) {
      throwNotFound('Business was not found.');
    }

    const rating = this.ratingRepository.create({
      ...ratingData,
      business,
    });

    await this.ratingRepository.save(rating);

    let avg = 0;

    const ratings = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.business = :id', { id: business.id })
      .getMany();

    for (let x = 0; x < ratings.length; x++) avg += ratings[x].rating;

    await this.businessRepository.update(business.id, {
      rating: avg / ratings.length,
    });

    await this.clientBookingsRepository.update(
      {
        uuid,
      },
      {
        uuid: null,
      },
    );

    return avg / ratings.length;
  }
}
