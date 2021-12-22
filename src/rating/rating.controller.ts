import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { formatResponse } from 'src/utils';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':uuid')
  async rateBusiness(
    @Param('uuid') uuid: string,
    @Body() rating: CreateRatingDto,
  ) {
    await this.ratingService.rateBusiness(uuid, rating);

    return formatResponse('Business rated.');
  }

  @Get(':uuid')
  async getBussinesAndServiceWithUuid(@Param('uuid') uuid: string) {
    await this.ratingService.getBussinesAndServiceWithUuid(uuid);

    return formatResponse('Business and service returned.');
  }
}
