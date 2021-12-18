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
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    await this.providerService.forgotPassword(forgotPassword);

    return formatResponse('Email sent');
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: ResetPasswordDto) {
    await this.providerService.resetPassword(resetPassword);

    return formatResponse('Password changed');
  }

  @UseGuards(ProviderGuard)
  @Get('business')
  async getBusiness(@Request() request) {
    const business = await this.providerService.getBusiness(request.user);

    return formatResponse('Business data.', business);
  }
}
