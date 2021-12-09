"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProviderEntity = void 0;
var business_entity_1 = require("../business/business.entity");
var typeorm_1 = require("typeorm");
var ProviderEntity = /** @class */ (function () {
    function ProviderEntity() {
    }
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return business_entity_1.Business; })
    ], ProviderEntity.prototype, "business");
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ProviderEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProviderEntity.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProviderEntity.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], ProviderEntity.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProviderEntity.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], ProviderEntity.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProviderEntity.prototype, "isLegalEntity");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        })
    ], ProviderEntity.prototype, "companyName");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProviderEntity.prototype, "code");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        })
    ], ProviderEntity.prototype, "vatCode");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], ProviderEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], ProviderEntity.prototype, "updatedAt");
    ProviderEntity = __decorate([
        (0, typeorm_1.Entity)('providers')
    ], ProviderEntity);
    return ProviderEntity;
}());
exports.ProviderEntity = ProviderEntity;
