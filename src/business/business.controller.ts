import { Body, Controller, Post } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  async createPost(@Body() business: CreateBussinesDto) {
    return this.bussinesService.create(business);
  }
}
