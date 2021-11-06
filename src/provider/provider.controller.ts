import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ProviderService } from './provider.service';
import { formatResponse } from '../utils';
import { LoginProviderDto } from './dto/login-provider.dto';
import { AuthService } from '../auth/auth.service';
import { ProviderGuard } from '../auth/guards/provider.guard';

@Controller('providers')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() providerData: CreateProviderDto) {
    await this.providerService.create(providerData);

    return formatResponse('Provider created.');
  }

  @Post('login')
  async login(@Body() loginProvider: LoginProviderDto) {
    const data = await this.authService.login(
      await this.providerService.login(loginProvider),
    );

    return formatResponse('Logged in.', data);
  }

  @UseGuards(ProviderGuard)
  @Get('user')
  async user(@Request() request) {
    return formatResponse('User data.', request.user);
  }
}
