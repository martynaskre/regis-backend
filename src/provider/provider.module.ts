import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from './provider.entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { Business } from '../business/business.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderEntity, Business]),
    AuthModule,
    MailModule,
  ],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService],
})
export class ProviderModule {
  //
}
