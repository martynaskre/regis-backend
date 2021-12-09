"use strict";
exports.__esModule = true;
var nestjs_seeder_1 = require("nestjs-seeder");
var category_seeder_1 = require("./category/category.seeder");
var typeorm_1 = require("@nestjs/typeorm");
var path = require("path");
var category_entity_1 = require("./category/category.entity");
var config_1 = require("@nestjs/config");
(0, nestjs_seeder_1.seeder)({
    imports: [
        config_1.ConfigModule.forRoot({ isGlobal: true }),
        typeorm_1.TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
            subscribers: [path.join(__dirname, '**/*.subscriber{.ts,.js}')]
        }),
        typeorm_1.TypeOrmModule.forFeature([category_entity_1.CategoryEntity]),
    ]
}).run([category_seeder_1.CategorySeeder]);
