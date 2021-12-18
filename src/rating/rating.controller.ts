import { Body, Controller, Param, Post } from '@nestjs/common';
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
}
