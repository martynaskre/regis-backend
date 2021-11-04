import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/CreateClient.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  create(@Body() createClientBody: CreateClientDto) {
    return this.clientService.create(createClientBody);
  }
}
