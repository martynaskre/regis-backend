import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from './provider.entity';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import {
  compareHash,
  formatFrontUrl,
  hash,
  throwValidationException,
} from '../utils';
import { LoginProviderDto } from './dto/login-provider.dto';
import { FrontEndpoint, JwtPayload } from '../types';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetService } from '../auth/passwor-resets/password-reset.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Business } from '../business/business.entity';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ProviderService {
  private readonly logger = new Logger(ProviderService.name);

  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
    private readonly storageService: StorageService,
  ) {}

  async create(providerData: CreateProviderDto) {
    this.logger.log('Creating new provider');

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
      'provider-welcome',
      {
        firstName: provider.firstName,
        actionUrl: formatFrontUrl(FrontEndpoint.PROVIDER_LOGIN),
      },
    );

    await this.providerRepository.save(provider);
  }

  async login(providerLogin: LoginProviderDto): Promise<JwtPayload> {
    this.logger.log('Logging in provider');

    const provider = await this.providerRepository.findOne({
      email: providerLogin.email,
    });

    if (
      !provider ||
      !(await compareHash(providerLogin.password, provider.password))
    ) {
      throwValidationException({
        email: 'These credentials do not match our records.',
      });
    }

    return {
      email: provider.email,
      sub: provider.id,
      type: 'provider',
    };
  }

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    this.logger.log('Forgot password of provider');

    await this.passwordResetService.handlePasswordForget(async () => {
      return await this.providerRepository.findOne({
        email: forgotPassword.email,
      });
    });
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    this.logger.log('Reseting password of provider');

    await this.passwordResetService.handlePasswordReset(
      'provider',
      resetPassword.token,
      resetPassword.email,
      async () => {
        const provider = await this.providerRepository.findOne({
          email: resetPassword.email,
        });

        await this.providerRepository.save({
          id: provider.id,
          password: await hash(resetPassword.password),
        });

        return provider;
      },
    );
  }

  async getBusiness(provider: ProviderEntity) {
    return await this.businessRepository
      .createQueryBuilder('business')
      .where('business.provider = :providerId', {
        providerId: provider.id,
      })
      .leftJoinAndSelect('business.category', 'category')
      .getOne();
  }
}
