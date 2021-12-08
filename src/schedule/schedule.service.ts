import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { ProviderEntity } from 'src/provider/provider.entity';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Business } from '../business/business.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly businessService: BusinessService,
  ) {}

  async createSchedule(scheduleData: CreateScheduleDto) {
    const business = await this.businessService.getBusinessById(
      scheduleData.businessId,
    );

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
    schedule: Schedule,
    updateSchedule: UpdateScheduleDto,
    provider: ProviderEntity,
  ) {
    if (schedule.business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.scheduleRepository.update(schedule.id, updateSchedule);
  }
}
