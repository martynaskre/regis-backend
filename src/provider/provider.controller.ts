import { Body, Controller, Get, UsePipes } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@Controller()
export class ProviderController {
  @Get('providers/signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() providerData: CreateProviderDto) {
    return 'Provider created.';
  }
}
