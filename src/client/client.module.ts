import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([Client]),AuthModule]
})
export class ClientModule {}
