import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessService } from "src/business/business.service";
import { ProviderEntity } from "src/provider/provider.entity";
import { Repository } from "typeorm";
import { createProviderBooking } from "./dto/create-provider-booking.dto";
import { ProviderBooking } from "./providerBooking.entity";

@Injectable()
export class ProviderBookingService{
    constructor(
        @InjectRepository(ProviderBooking)
        private readonly providerBookingRepository: Repository<ProviderBooking>,
        private readonly businessService: BusinessService,
    ){}


    async createBooking(provider: ProviderEntity, bookingData: createProviderBooking){
        const business =await this.businessService.getBusinessById(bookingData.businessId);

        if (!business || business.provider.id !== provider.id) {
            throw new HttpException(
              {
                message: 'Service was not found',
              },
              HttpStatus.NOT_FOUND,
            );
          }

        const booking = this.providerBookingRepository.create({
            ...bookingData,
            business: business,
        })

        await this.providerBookingRepository.save(booking);

        return booking;
    }
}