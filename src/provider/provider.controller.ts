import {
  Body,
  Controller,
  Get,
  UseGuards,
  UsePipes,
  Request,
  Post,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
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
  @UsePipes(new ValidationPipe())
  async signup(@Body() providerData: CreateProviderDto) {
    await this.providerService.create(providerData);

    return formatResponse('Provider created.');
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginProvider: LoginProviderDto) {
    const data = await this.authService.login(
      await this.providerService.login(loginProvider),
    );

    return formatResponse('Logged in.', data);
  }

  @UseGuards(ProviderGuard)
  @Get('user')
  async user(@Request() req) {
    return formatResponse('User data.', req.user);
  }
}
