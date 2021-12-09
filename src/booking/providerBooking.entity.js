"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProviderBooking = void 0;
var business_entity_1 = require("../business/business.entity");
var client_entity_1 = require("../client/client.entity");
var typeorm_1 = require("typeorm");
var ProviderBooking = /** @class */ (function () {
    function ProviderBooking() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ProviderBooking.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return client_entity_1.Client; }, function (client) { return client.clientBookings; })
    ], ProviderBooking.prototype, "provider");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return business_entity_1.Business; }, function (business) { return business.providerBookings; })
    ], ProviderBooking.prototype, "business");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp'
        })
    ], ProviderBooking.prototype, "reservedTime");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], ProviderBooking.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], ProviderBooking.prototype, "updatedAt");
    ProviderBooking = __decorate([
        (0, typeorm_1.Entity)('provider_bookings')
    ], ProviderBooking);
    return ProviderBooking;
}());
exports.ProviderBooking = ProviderBooking;
