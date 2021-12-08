import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/service/service.entity';
import { Business } from '../business/business.entity';
import { BusinessService } from '../business/business.service';
import { RatingController } from './rating.controller';
import { Rating } from './rating.entity';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Business, Service])],
  controllers: [RatingController],
  providers: [RatingService, BusinessService],
})
export class RatingModule {}
