import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateClientBookingDto{
    @IsNumber()
    @IsNotEmpty()
    serviceId: number;

    @IsDate()
    @IsNotEmpty()
    reservedTime: Date;
}