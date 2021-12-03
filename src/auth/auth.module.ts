import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProviderStrategy } from './strategies/provider.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';
import { ClientStrategy } from './strategies/client.strategy';
import { Client } from '../client/client.entity';
import { PasswordResetEntity } from './passwordResets/passwordReset.entity';
import { PasswordResetService } from './passwordResets/passwordReset.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 2592000,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ProviderEntity, Client, PasswordResetEntity]),
  ],
  providers: [
    AuthService,
    ProviderStrategy,
    ClientStrategy,
    PasswordResetService,
  ],
  exports: [AuthService, PasswordResetService],
})
export class AuthModule {}
