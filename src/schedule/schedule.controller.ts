import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ProviderGuard } from 'src/auth/guards/provider.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';
import { BusinessOwnerGuard } from '../auth/guards/business-owner.guard';
import { Entity } from '../shared/decorators/entity.decorator';
import { Schedule } from './schedule.entity';
import { formatResponse } from '../utils';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(ProviderGuard, BusinessOwnerGuard)
  @Post()
  async createSchedule(@Body() schedule: CreateScheduleDto) {
    await this.scheduleService.createSchedule(schedule);

    return formatResponse('Schedule entry created.');
  }

  @UseGuards(ProviderGuard)
  @Get(':businessId')
  async getProviderSchedule(@Param('businessId') id: string) {
    const schedule = await this.scheduleService.getProviderSchedule(Number(id));

    return formatResponse('Business schedule', schedule);
  }

  @UseGuards(ProviderGuard)
  @Put(':id')
  async updateSchedule(
    @Entity(Schedule) schedule: Schedule,
    @Body() updateSchedule: UpdateScheduleDto,
    @Request() request,
  ) {
    await this.scheduleService.updateSchedule(
      schedule,
      updateSchedule,
      request.user,
    );

    return formatResponse('Schedule entry updated.');
  }
}
