import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { formatResponse } from '../utils';


@Controller('clients')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly authService: AuthService
    ) {}
   
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() clientData: CreateClientDto) {
    await this.clientService.create(clientData);

    return formatResponse('Client created.');
  }  
 
}

