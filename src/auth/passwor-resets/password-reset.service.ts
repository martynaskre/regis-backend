import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetEntity } from './password-reset.entity';
import { ProviderEntity } from '../../provider/provider.entity';
import { Client } from '../../client/client.entity';
import { formatFrontUrl, hash, throwValidationException } from '../../utils';
import { MailService } from '../../mail/mail.service';
import { FrontEndpoint } from '../../types';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,
    private readonly mailService: MailService,
  ) {}

  private async createPasswordReset(entity: ProviderEntity | Client) {
    const passwordReset = new PasswordResetEntity();

    const token = await hash(new Date().toDateString() + entity.email);

    const expiresAt = new Date();
    expiresAt.setMinutes(new Date().getMinutes() + 15);

    passwordReset.type =
      entity instanceof ProviderEntity ? 'provider' : 'client';
    passwordReset.email = entity.email;
    passwordReset.token = token;
    passwordReset.expiresAt = expiresAt;

    await this.passwordResetRepository.save(passwordReset);

    return token;
  }

  async handlePasswordForget(
    fetchEntity: () => Promise<ProviderEntity | Client>,
  ) {
    const entity = await fetchEntity();

    if (!entity) {
      throwValidationException({
        email: 'Provided email address is invalid.',
      });
    }

    const token = await this.createPasswordReset(entity);

    await this.mailService.sendMail(
      entity.email,
      'Slaptažodžio atkūrimo užklausa',
      'reset-password',
      {
        entity,
        token,
        actionUrl: formatFrontUrl(
          entity instanceof Client
            ? FrontEndpoint.CLIENT_PASSWORD_RESET
            : FrontEndpoint.PROVIDER_PASSWORD_RESET,
          {
            token,
            email: entity.email,
          },
        ),
      },
    );
  }

  async handlePasswordReset(
    type: 'client' | 'provider',
    token: string,
    email: string,
    updateEntity: () => Promise<ProviderEntity | Client>,
  ) {
    const passwordResetEntity = await this.passwordResetRepository.findOne({
      token,
    });

    if (
      !passwordResetEntity ||
      passwordResetEntity.email !== email ||
      passwordResetEntity.type !== type
    ) {
      throwValidationException({
        email: 'Provided email address is invalid.',
      });
    }

    const entity = await updateEntity();

    await this.passwordResetRepository.delete({
      token,
    });

    await this.mailService.sendMail(
      email,
      'Jūsų slaptažodis buvo pakeistas',
      'password-changed',
      {
        firstName: entity.firstName,
      },
    );
  }
}
