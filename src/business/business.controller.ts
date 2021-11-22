import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  PaginatedBusinessesResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @UseGuards(ProviderGuard)
  @Post()
  async createBusiness(
    @Body() business: CreateBussinesDto,
    @Request() request,
  ) {
    return this.bussinesService.createBusiness(business, request.user);
  }

  @UseGuards(ProviderGuard)
  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() UpdateBusinessBody: UpadateBussinesDto,
    @Request() request,
  ) {
    console.log(request.user);
    return this.bussinesService.updateBusiness(
      Number(id),
      UpdateBusinessBody,
      request.user,
    );
  }

  @Get()
  async getBusinesses(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedBusinessesResultDto> {
    return this.bussinesService.getBusinesses({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @UseGuards(ProviderGuard)
  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return this.bussinesService.getBusinessById(Number(id));
  }

  //@GET(provider/:id)

  @UseGuards(ProviderGuard)
  @Delete(':id')
  async deleteBusinessById(@Param('id') id: string, @Request() request) {
    return this.bussinesService.deleteBusinessById(Number(id), request.user);
  }
}
