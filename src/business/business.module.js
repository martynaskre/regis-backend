"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var business_controller_1 = require("./business.controller");
var business_entity_1 = require("./business.entity");
var business_service_1 = require("./business.service");
var service_entity_1 = require("../service/service.entity");
var nestjs_form_data_1 = require("nestjs-form-data");
var BusinessModule = /** @class */ (function () {
    function BusinessModule() {
    }
    BusinessModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([business_entity_1.Business, service_entity_1.Service]),
                nestjs_form_data_1.NestjsFormDataModule,
            ],
            controllers: [business_controller_1.BusinessController],
            providers: [business_service_1.BusinessService]
        })
    ], BusinessModule);
    return BusinessModule;
}());
exports.BusinessModule = BusinessModule;
