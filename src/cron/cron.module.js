"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CronModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var password_reset_entity_1 = require("../auth/passwor-resets/password-reset.entity");
var clean_password_resets_job_1 = require("./jobs/clean-password-resets.job");
var CronModule = /** @class */ (function () {
    function CronModule() {
    }
    CronModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([password_reset_entity_1.PasswordResetEntity])],
            providers: [clean_password_resets_job_1.CleanPasswordResetsJob]
        })
    ], CronModule);
    return CronModule;
}());
exports.CronModule = CronModule;
