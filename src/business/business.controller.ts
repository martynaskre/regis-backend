import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { RequestWithProvider } from '../interfaces/requestWithProvider.interface';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  async createBusiness(
    @Body() business: CreateBussinesDto,
    @Req() request: RequestWithProvider,
  ) {
    return this.bussinesService.createBusiness(business, request.provider);
  }

  //@POST(service)

  @Put(':id')
  async(
    @Param('id') id: string,
    @Body() UpdateBusinessBody: UpadateBussinesDto,
  ) {
    return this.bussinesService.updateBusiness(Number(id), UpdateBusinessBody);
  }

  @Get()
  async getBusinesses() {
    return this.bussinesService.getBusinesses();
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return this.bussinesService.getBusinessById(Number(id));
  }

  //@GET(user/:id)

  @Delete(':id')
  async deleteBusinessById(@Param('id') id: string) {
    return this.bussinesService.deleteBusinessById(Number(id));
  }
}
