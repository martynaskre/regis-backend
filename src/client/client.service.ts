import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { compareHash, hash } from '../utils';
import { LogInClientDto } from './dto/login-client.dto';
import { JwtPayload } from '../types';

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

  async login(loginClient: LogInClientDto): Promise<JwtPayload> {
    const client = await this.clientRepository.findOne({
      email: loginClient.email,
    });

    if (
      !client ||
      !(await compareHash(loginClient.password, client.password))
    ) {
      throw new HttpException(
        {
          message: 'The given data was invalid.',
          errors: {
            email: 'These credentials do not match our records.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      email: client.email,
      sub: client.id,
      type: 'provider',
    };
  }

}
