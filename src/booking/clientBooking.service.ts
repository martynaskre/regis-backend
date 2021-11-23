import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "src/client/client.entity";
import { Repository } from "typeorm";
import { ClientBooking } from "./clientBooking.entity";
import { CreateClientBookingDto } from "./dto/create-client-Booking.dto";

@Injectable()
export class ClientBookingService{
    constructor(
        @InjectRepository(ClientBooking)
        private readonly clientBookingRepository: Repository<ClientBooking>
    ){}

    async createBooking(clientBookingData: CreateClientBookingDto, client: Client){
        return console.log(client, clientBookingData);

    }



}