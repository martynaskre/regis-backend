import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
