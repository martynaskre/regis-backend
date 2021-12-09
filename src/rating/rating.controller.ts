import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClientGuard } from 'src/auth/guards/client.guard';
import { formatResponse } from 'src/utils';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(ClientGuard)
  @Post()
  async rateBusiness(@Body() rating: CreateRatingDto) {
    await this.ratingService.rateBusiness(rating);

    return formatResponse('Business rated.');
  }
}
