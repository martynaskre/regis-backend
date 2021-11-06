import { Body, Controller, Post, Req } from '@nestjs/common';
import { RequestWithProvider } from 'src/interfaces/requestWithProvider.interface';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  async createPost(@Body() business: CreateBussinesDto,
  @Req() request: RequestWithProvider) {
    console.log(request.provider)
    return this.bussinesService.create(business, request.provider);
  }
}
