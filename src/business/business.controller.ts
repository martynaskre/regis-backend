import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { RequestWithProvider } from 'src/interfaces/requestWithProvider.interface';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  @UseGuards(ProviderGuard)
  async createBusiness(@Body() business: CreateBussinesDto,
  @Req() request: RequestWithProvider) {
    return this.bussinesService.createBusiness(business, request.provider);
  }

  //@POST(service)

  //@PUT(:id)

  @Get()
  async getBusinesses(){
    return this.bussinesService.getBusinesses();
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string){
    return this.bussinesService.getBusinessById(Number(id));

  }


  //@GET(user/:id)

  //@DELETE()
}
