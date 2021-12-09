"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var client_controller_1 = require("./client.controller");
var client_entity_1 = require("./client.entity");
var client_service_1 = require("./client.service");
var auth_module_1 = require("../auth/auth.module");
var mail_module_1 = require("../mail/mail.module");
var ClientModule = /** @class */ (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        (0, common_1.Module)({
            controllers: [client_controller_1.ClientController],
            providers: [client_service_1.ClientService],
            imports: [typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client]), auth_module_1.AuthModule, mail_module_1.MailModule]
        })
    ], ClientModule);
    return ClientModule;
}());
exports.ClientModule = ClientModule;
