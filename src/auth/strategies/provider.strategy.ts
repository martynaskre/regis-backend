import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../types';
import { ProviderEntity } from '../../provider/provider.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProviderStrategy extends PassportStrategy(Strategy, 'provider') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const provider = this.providerRepository.findOne({
      id: payload.sub,
    });

    if (payload.type !== 'provider' || !provider) {
      throw new UnauthorizedException();
    }

    return provider;
  }
}
