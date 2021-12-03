import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LogInClientDto } from './dto/login-client.dto';
import { formatResponse } from '../utils';
import { ClientGuard } from '../auth/guards/client.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() clientData: CreateClientDto) {
    await this.clientService.create(clientData);

    return formatResponse('Client created.');
  }

  @Post('login')
  async login(@Body() loginClient: LogInClientDto) {
    const data = await this.authService.login(
      await this.clientService.login(loginClient),
    );

    return formatResponse('Logged in.', data);
  }

  @UseGuards(ClientGuard)
  @Get('user')
  async user(@Request() request) {
    return formatResponse('User data.', request.user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    await this.clientService.forgotPassword(forgotPassword);

    return formatResponse('Email sent');
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: ResetPasswordDto) {
    await this.clientService.resetPassword(resetPassword);

    return formatResponse('Password changed');
  }
}
