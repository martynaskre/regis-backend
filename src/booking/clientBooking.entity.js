"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientBooking = void 0;
var client_entity_1 = require("../client/client.entity");
var service_entity_1 = require("../service/service.entity");
var typeorm_1 = require("typeorm");
var ClientBooking = /** @class */ (function () {
    function ClientBooking() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ClientBooking.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return client_entity_1.Client; }, function (client) { return client.clientBookings; })
    ], ClientBooking.prototype, "client");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return service_entity_1.Service; }, function (service) { return service.clientBookings; })
    ], ClientBooking.prototype, "service");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp'
        })
    ], ClientBooking.prototype, "reservedTime");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], ClientBooking.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], ClientBooking.prototype, "updatedAt");
    ClientBooking = __decorate([
        (0, typeorm_1.Entity)('client_bookings')
    ], ClientBooking);
    return ClientBooking;
}());
exports.ClientBooking = ClientBooking;
