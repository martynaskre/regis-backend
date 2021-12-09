"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Business = void 0;
var provider_entity_1 = require("../provider/provider.entity");
var typeorm_1 = require("typeorm");
var service_entity_1 = require("../service/service.entity");
var providerBooking_entity_1 = require("../booking/providerBooking.entity");
var category_entity_1 = require("../category/category.entity");
var Business = /** @class */ (function () {
    function Business() {
    }
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return provider_entity_1.ProviderEntity; }, function (provider) { return provider.business; }),
        (0, typeorm_1.JoinColumn)()
    ], Business.prototype, "provider");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return service_entity_1.Service; }, function (service) { return service.business; })
    ], Business.prototype, "services");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return providerBooking_entity_1.ProviderBooking; }, function (providerBooking) { return providerBooking.business; })
    ], Business.prototype, "providerBookings");
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Business.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true,
            nullable: true
        })
    ], Business.prototype, "slug");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "addressCountry");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "addressCity");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "addressStreet");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "addressHouseNumber");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "addressPostCode");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "shortDescription");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "longDescription");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "cover");
    __decorate([
        (0, typeorm_1.Column)()
    ], Business.prototype, "logo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return category_entity_1.CategoryEntity; }),
        (0, typeorm_1.JoinColumn)()
    ], Business.prototype, "category");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], Business.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], Business.prototype, "updatedAt");
    Business = __decorate([
        (0, typeorm_1.Entity)('businesses')
    ], Business);
    return Business;
}());
exports.Business = Business;
