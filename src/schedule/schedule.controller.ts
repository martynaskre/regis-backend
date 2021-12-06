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
import { UpadateServiceDto } from 'src/service/dto/update-service.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpadteScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(ProviderGuard)
  @Post()
  async createSchedule(
    @Body() schedule: CreateScheduleDto,
    @Request() request,
  ) {
    return this.scheduleService.createSchedule(schedule, request.user);
  }

  @UseGuards(ProviderGuard)
  @Get(':businessId')
  async getProviderSchedule(@Param('businessId') id: string) {
    console.log('Working');
    return this.scheduleService.getProviderSchedule(Number(id));
  }

  @UseGuards(ProviderGuard)
  @Put(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateSchedule: UpadteScheduleDto,
    @Request() request,
  ) {
    return this.scheduleService.updateSchedule(
      Number(id),
      updateSchedule,
      request.user,
    );
  }

  //update
}
