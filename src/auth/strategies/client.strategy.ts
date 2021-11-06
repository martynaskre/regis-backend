import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../../client/client.entity';

@Injectable()
export class ClientStrategy extends PassportStrategy(Strategy, 'client') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const client = this.clientRepository.findOne({
      id: payload.sub,
    });

    if (payload.type !== 'client' || !client) {
      throw new UnauthorizedException();
    }

    return client;
  }
}
