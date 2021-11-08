import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { RequestWithProvider } from 'src/interfaces/requestWithProvider.interface';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @Post()
  @UseGuards(ProviderGuard)
  async createPost(@Body() business: CreateBussinesDto,
  @Req() request: RequestWithProvider) {
    console.log(request.provider)
    return this.bussinesService.create(business, request.provider);
  }

  //@POST(/service)

  //@PUT(:id)

  //@GET()

  //@GET(:id)

  //@DELETE()
}
