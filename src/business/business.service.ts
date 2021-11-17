import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Console } from 'console';

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
    const business = this.businessRepository.create({
      ...businessData,
      provider: provider,
    });
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
      .leftJoinAndSelect("business.provider", "provider")
      .getOne();
    return business;
  }

  async deleteBusinessById(id: number) {
    await this.businessRepository
      .createQueryBuilder('business')
      .delete()
      .where({ id: id })
      .execute();

    return 'business deleted';
  }

  async updateBusiness(id: number, UpdateBusinessBody: UpadateBussinesDto, provider: ProviderEntity,) {

    const business = await this.getBusinessById(id);

    if(business.provider.id !== provider.id){
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.businessRepository.update(id, UpdateBusinessBody);

    return await this.businessRepository.findOne(id);
  }
}
