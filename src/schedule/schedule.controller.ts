import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ProviderGuard } from 'src/auth/guards/provider.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service.dto';

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
}
