import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';
import { BusinessService } from '../business/business.service';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Business])],
  controllers: [ServiceController],
  providers: [ServiceService, BusinessService],
})
export class ServiceModule {}
