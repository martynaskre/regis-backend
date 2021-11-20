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

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    private readonly mailService: MailService,
  ) {}

  async create(providerData: CreateProviderDto) {
    const provider = new ProviderEntity();

    provider.firstName = providerData.first_name;
    provider.lastName = providerData.last_name;
    provider.email = providerData.email;
    provider.password = await hash(providerData.password);
    provider.phoneNumber = providerData.phone_number;
    provider.isLegalEntity = providerData.is_legal_entity == '1';
    provider.code = providerData.code;

    if (provider.isLegalEntity) {
      provider.companyName = providerData.company_name;
      provider.vatCode = providerData.vat_code;
    }

    await this.mailService.sendMail(provider.email, 'test', 'provider.welcome');

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
}
