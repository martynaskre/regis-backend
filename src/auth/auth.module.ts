import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProviderStrategy } from './strategies/provider.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ProviderEntity]),
  ],
  providers: [AuthService, ProviderStrategy],
  exports: [AuthService],
})
export class AuthModule {}
