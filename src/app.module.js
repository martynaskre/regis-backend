"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var client_module_1 = require("./client/client.module");
var provider_module_1 = require("./provider/provider.module");
var auth_module_1 = require("./auth/auth.module");
var mail_module_1 = require("./mail/mail.module");
var business_module_1 = require("./business/business.module");
var service_module_1 = require("./service/service.module");
var path = require("path");
var booking_module_1 = require("./booking/booking.module");
var schedule_1 = require("@nestjs/schedule");
var cron_module_1 = require("./cron/cron.module");
var category_module_1 = require("./category/category.module");
var nest_storage_1 = require("@squareboat/nest-storage");
var nestjs_form_data_1 = require("nestjs-form-data");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                schedule_1.ScheduleModule.forRoot(),
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
                nest_storage_1.StorageModule.register({
                    "default": 'docs',
                    disks: {
                        public: {
                            driver: 'local',
                            basePath: path.join(process.cwd(), 'storage'),
                            baseUrl: 'https://regis-backend.test'
                        }
                    }
                }),
                nestjs_form_data_1.NestjsFormDataModule,
                auth_module_1.AuthModule,
                client_module_1.ClientModule,
                provider_module_1.ProviderModule,
                mail_module_1.MailModule,
                business_module_1.BusinessModule,
                booking_module_1.BookingModule,
                service_module_1.ServiceModule,
                cron_module_1.CronModule,
                category_module_1.CategoryModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
