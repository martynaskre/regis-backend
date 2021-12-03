import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetEntity } from './passwordReset.entity';
import { ProviderEntity } from '../../provider/provider.entity';
import { Client } from '../../client/client.entity';
import { hash } from '../../utils';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,
  ) {}

  async createPasswordReset(entity: ProviderEntity | Client) {
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

  async findResetEntity(token: string) {
    const passwordReset = await this.passwordResetRepository.findOne({
      token,
    });

    return !passwordReset || passwordReset.expiresAt < new Date()
      ? undefined
      : passwordReset;
  }

  async removeEntity(token: string) {
    await this.passwordResetRepository.delete({
      token,
    });
  }
}
