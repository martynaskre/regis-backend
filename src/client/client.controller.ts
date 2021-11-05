import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LogInClientDto } from './dto/login-client.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { formatResponse } from '../utils';
import { ClientGuard } from '../auth/guards/client.guard';


@Controller('clients')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly authService: AuthService
    ) {}
   
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() clientData: CreateClientDto) {
    await this.clientService.create(clientData);

    return formatResponse('Client created.');
  }  

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginClient: LogInClientDto) {
    const data = await this.authService.login(
      await this.clientService.login(loginClient),
    );

    return formatResponse('Logged in.', data);
  }

  @UseGuards(ClientGuard)
  @Get('user')
  async user(@Request() req) {
    return formatResponse('User data.', req.user);
  }
 
}

