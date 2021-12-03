import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { compareHash, hash, throwValidationException } from '../utils';
import { LogInClientDto } from './dto/login-client.dto';
import { JwtPayload } from '../types';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetService } from '../auth/passwordResets/passwordReset.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
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

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    const client = await this.clientRepository.findOne({
      email: forgotPassword.email,
    });

    if (!client) {
      throwValidationException({
        email: 'Provided email address is invalid.',
      });
    }

    const token = await this.passwordResetService.createPasswordReset(client);

    await this.mailService.sendMail(
      client.email,
      'Slaptažodžio atkūrimo užklausa',
      'client.reset-password',
      {
        client,
        token,
      },
    );
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    const passwordReset = await this.passwordResetService.findResetEntity(
      resetPassword.token,
    );

    if (!passwordReset || passwordReset.email !== resetPassword.email) {
      throwValidationException({
        email: 'Provided email address is invalid.',
      });
    }

    await this.clientRepository.update(
      { email: resetPassword.email },
      {
        password: await hash(resetPassword.password),
      },
    );

    await this.passwordResetService.removeEntity(resetPassword.token);
  }
}
