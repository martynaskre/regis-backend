import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';

@UseGuards(ProviderGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  async createBusiness(
    @Body() business: CreateBussinesDto,
    @Request() request,
  ) {
    return this.bussinesService.createBusiness(business, request.user);
  }

  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() UpdateBusinessBody: UpadateBussinesDto,
    @Request() request,
  ) {
    console.log(request.user)
    return this.bussinesService.updateBusiness(Number(id), UpdateBusinessBody, request.user);
  }

  @Get()
  async getBusinesses() {
    return this.bussinesService.getBusinesses();
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return this.bussinesService.getBusinessById(Number(id));
  }

  //@GET(provider/:id)

  @Delete(':id')
  async deleteBusinessById(@Param('id') id: string) {
    return this.bussinesService.deleteBusinessById(Number(id));
  }
}
