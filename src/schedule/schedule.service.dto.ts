import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { ProviderEntity } from 'src/provider/provider.entity';

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

    // PATIKRINTI AR JAU NERA 7 DIENU IKELTA

    const schedule = this.scheduleRepository.create({
      ...scheduleData,
    });

    await this.scheduleRepository.save(schedule);

    return schedule;
  }
}
