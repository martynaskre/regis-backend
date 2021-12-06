import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { ProviderEntity } from 'src/provider/provider.entity';
import { UpadteScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly businessService: BusinessService,
  ) {}

  async createSchedule(
    scheduleData: CreateScheduleDto,
    provider: ProviderEntity,
  ) {
    const business = await this.businessService.getBusinessById(
      scheduleData.businessid,
    );

    if (business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const schedule = this.scheduleRepository.create({
      ...scheduleData,
      business,
    });

    await this.scheduleRepository.save(schedule);

    return schedule;
  }

  async getProviderSchedule(businessId: number) {
    const schedule = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('schedule.business = :id', { id: businessId })
      .orderBy('schedule.id')
      .getMany();

    return schedule;
  }

  async updateSchedule(
    id: number,
    updateSchedule: UpadteScheduleDto,
    provider: ProviderEntity,
  ) {
    const schedule = await this.scheduleRepository
      .createQueryBuilder('scehdule')
      .where({ id: id })
      .leftJoinAndSelect('scehdule.business', 'business')
      .leftJoinAndSelect('business.provider', 'provider')
      .getOne();

    if (schedule.business.provider.id !== provider.id || !schedule) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.scheduleRepository.update(id, updateSchedule);

    return await this.scheduleRepository.findOne(id);
  }
}
