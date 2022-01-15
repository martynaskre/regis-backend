import { seeder } from 'nestjs-seeder';
import { CategorySeeder } from './category/category.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { CategoryEntity } from './category/category.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

seeder({
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
    TypeOrmModule.forFeature([CategoryEntity]),
    CategoryModule,
  ],
}).run([CategorySeeder]);
