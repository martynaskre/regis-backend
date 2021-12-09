"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProviderModule = void 0;
var common_1 = require("@nestjs/common");
var provider_service_1 = require("./provider.service");
var provider_controller_1 = require("./provider.controller");
var typeorm_1 = require("@nestjs/typeorm");
var provider_entity_1 = require("./provider.entity");
var auth_module_1 = require("../auth/auth.module");
var mail_module_1 = require("../mail/mail.module");
var ProviderModule = /** @class */ (function () {
    function ProviderModule() {
    }
    ProviderModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([provider_entity_1.ProviderEntity]), auth_module_1.AuthModule, mail_module_1.MailModule],
            providers: [provider_service_1.ProviderService],
            controllers: [provider_controller_1.ProviderController],
            exports: [provider_service_1.ProviderService]
        })
    ], ProviderModule);
    return ProviderModule;
}());
exports.ProviderModule = ProviderModule;
