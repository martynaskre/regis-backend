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
  async getBusinessAndServiceWithUuid(@Param('uuid') uuid: string) {
    const response = await this.ratingService.getBusinessAndServiceWithUuid(
      uuid,
    );

    return formatResponse('Business and service returned.', response);
  }
}
