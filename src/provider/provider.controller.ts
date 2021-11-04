import { Body, Controller, Get, UsePipes } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ProviderService } from './provider.service';
import { formatResponse } from '../utils';
import { LoginProviderDto } from './dto/login-provider.dto';

@Controller()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get('providers/signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() providerData: CreateProviderDto) {
    await this.providerService.create(providerData);

    return formatResponse('Provider created.');
  }

  @Get('providers/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginProvider: LoginProviderDto) {
    await this.providerService.login(loginProvider);

    return formatResponse('Provider created.');
  }
}
