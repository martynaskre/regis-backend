import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { compareHash, hash } from '../utils';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(clientData: CreateClientDto) {
    const client = new Client();

    client.firstName = clientData.first_name;
    client.lastName = clientData.last_name;
    client.email = clientData.email;
    client.password = await hash(clientData.password);
    client.phoneNumber = clientData.phone_number;

    await this.clientRepository.save(client);
  }

}
