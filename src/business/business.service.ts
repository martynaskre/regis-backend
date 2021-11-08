import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from 'src/provider/provider.entity';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { CreateBussinesDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async createBusiness(
    businessData: CreateBussinesDto,
    provider: ProviderEntity,
  ) {
    const business = new Business();

    business.provider = provider;
    business.title = businessData.title;
    business.adressCountry = businessData.address_country;
    business.adressCity = businessData.address_city;
    business.adressStreet = businessData.address_street;
    business.adressHouseNumber = businessData.address_house_number;
    business.adressPostCode = businessData.address_post_code;
    business.shortDescription = businessData.short_description;
    business.longDescription = businessData.long_description;

    await this.businessRepository.save(business);

    return business;
  }

  async getBusinesses() {
    const businesses = await this.businessRepository
      .createQueryBuilder('business')
      .orderBy('business.id')
      .getMany();

    return businesses;
  }

  async getBusinessById(id: number) {
    const business = await this.businessRepository
    .createQueryBuilder('business')
    .where({ id: id })
    .getOne();

    return business;
  }

  async deleteBusinessById(id: number) {
    const business = await this.businessRepository
    .createQueryBuilder('business')
    .delete().where({id: id}).execute();;

    return "business";
  }
}
