import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { compareHash, hash, throwValidationException } from '../utils';
import { LogInClientDto } from './dto/login-client.dto';
import { JwtPayload } from '../types';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly mailService: MailService,
  ) {}

  async create(clientData: CreateClientDto) {
    const client = new Client();

    client.firstName = clientData.firstName;
    client.lastName = clientData.lastName;
    client.email = clientData.email;
    client.password = await hash(clientData.password);
    client.phoneNumber = clientData.phoneNumber;

    await this.clientRepository.save(client);

    await this.mailService.sendMail(
      client.email,
      'Sveikiname prisijungus!',
      'client.welcome',
      {
        client,
      },
    );
  }

  async login(loginClient: LogInClientDto): Promise<JwtPayload> {
    const client = await this.clientRepository.findOne({
      email: loginClient.email,
    });

    if (
      !client ||
      !(await compareHash(loginClient.password, client.password))
    ) {
      throwValidationException({
        email: 'These credentials do not match our records.',
      });
    }

    return {
      email: client.email,
      sub: client.id,
      type: 'client',
    };
  }
}
