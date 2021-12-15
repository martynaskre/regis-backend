import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import {
  compareHash,
  formatFrontUrl,
  hash,
  throwValidationException,
} from '../utils';
import { LogInClientDto } from './dto/login-client.dto';
import { FrontEndpoint, JwtPayload } from '../types';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetService } from '../auth/passwor-resets/password-reset.service';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  async create(clientData: CreateClientDto) {
    this.logger.log('Creating new client');

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
      'client-welcome',
      {
        firstName: client.firstName,
        actionUrl: formatFrontUrl(FrontEndpoint.CLIENT_LOGIN),
      },
    );
  }

  async login(loginClient: LogInClientDto): Promise<JwtPayload> {
    this.logger.log('Logging in client');

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

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    this.logger.log('Forgot password of client');

    await this.passwordResetService.handlePasswordForget(async () => {
      return await this.clientRepository.findOne({
        email: forgotPassword.email,
      });
    });
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    this.logger.log('Reseting password of client');

    await this.passwordResetService.handlePasswordReset(
      'client',
      resetPassword.token,
      resetPassword.email,
      async () => {
        const client = await this.clientRepository.findOne({
          email: resetPassword.email,
        });

        await this.clientRepository.save({
          id: client.id,
          password: await hash(resetPassword.password),
        });

        return client;
      },
    );
  }
}
