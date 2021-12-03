import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from './provider.entity';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { compareHash, hash } from '../utils';
import { LoginProviderDto } from './dto/login-provider.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JwtPayload } from '../types';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetService } from '../auth/passwordResets/passwordReset.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  async create(providerData: CreateProviderDto) {
    const provider = new ProviderEntity();

    provider.firstName = providerData.firstName;
    provider.lastName = providerData.lastName;
    provider.email = providerData.email;
    provider.password = await hash(providerData.password);
    provider.phoneNumber = providerData.phoneNumber;
    provider.isLegalEntity = providerData.isLegalEntity == '1';
    provider.code = providerData.code;

    if (provider.isLegalEntity) {
      provider.companyName = providerData.companyName;
      provider.vatCode = providerData.vatCode;
    }

    await this.mailService.sendMail(
      provider.email,
      'Sveikiname prisijungus!',
      'provider.welcome',
      {
        provider,
      },
    );

    await this.providerRepository.save(provider);
  }

  async login(providerLogin: LoginProviderDto): Promise<JwtPayload> {
    const provider = await this.providerRepository.findOne({
      email: providerLogin.email,
    });

    if (
      !provider ||
      !(await compareHash(providerLogin.password, provider.password))
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
      email: provider.email,
      sub: provider.id,
      type: 'provider',
    };
  }

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    const provider = await this.providerRepository.findOne({
      email: forgotPassword.email,
    });

    if (!provider) {
      throw new HttpException(
        {
          message: 'The given data was invalid.',
          errors: {
            email: 'Provided email address is invalid.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = await this.passwordResetService.createPasswordReset(provider);

    await this.mailService.sendMail(
      provider.email,
      'Slaptažodžio atkūrimo užklausa',
      'provider.reset-password',
      {
        provider,
        token,
      },
    );
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    const passwordReset = await this.passwordResetService.findResetEntity(
      resetPassword.token,
    );

    if (!passwordReset || passwordReset.email !== resetPassword.email) {
      throw new HttpException(
        {
          message: 'The given data was invalid.',
          errors: {
            email: 'Provided email address is invalid.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.providerRepository.update(
      { email: resetPassword.email },
      {
        password: await hash(resetPassword.password),
      },
    );

    await this.passwordResetService.removeEntity(resetPassword.token);
  }
}
