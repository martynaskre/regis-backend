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
import { CronModule } from './cron/cron.module';
import { CategoryModule } from './category/category.module';
import { SchedulesModule } from './schedule/schedule.module';
import { RatingModule } from './rating/rating.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { StorageModule } from './storage/storage.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
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
    }),
    StorageModule.register({
      disks: {
        public: {
          driver: 'local',
          path: path.join(process.cwd(), 'storage', 'public'),
          baseUrl: process.env.STORAGE_URL,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(<string>process.env.REDIS_PORT),
      },
    }),
    ScheduleModule.forRoot(),
    CronModule,
    NestjsFormDataModule,
    AuthModule,
    ClientModule,
    ProviderModule,
    MailModule,
    BusinessModule,
    BookingModule,
    ServiceModule,
    CategoryModule,
    SchedulesModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
