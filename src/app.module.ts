import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ProviderModule } from './provider/provider.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BusinessModule } from './business/business.module';
import { ServiceModule } from './service/service.module';
import * as path from 'path';
import { BookingModule } from './booking/booking.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { CategoryModule } from './category/category.module';
import { StorageModule } from '@squareboat/nest-storage';
import { NestjsFormDataModule } from 'nestjs-form-data';

console.log(process.cwd());

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(<string>process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
      subscribers: [path.join(__dirname, '**/*.subscriber{.ts,.js}')],
    }),
    StorageModule.register({
      default: 'docs',
      disks: {
        public: {
          driver: 'local',
          basePath: path.join(process.cwd(), 'storage', 'public'),
          baseUrl: process.env.STORAGE_URL,
        },
      },
    }),
    NestjsFormDataModule,
    AuthModule,
    ClientModule,
    ProviderModule,
    MailModule,
    BusinessModule,
    BookingModule,
    ServiceModule,
    CronModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
