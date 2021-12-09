"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Service = void 0;
var business_entity_1 = require("../business/business.entity");
var typeorm_1 = require("typeorm");
var clientBooking_entity_1 = require("../booking/clientBooking.entity");
var Service = /** @class */ (function () {
    function Service() {
    }
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return business_entity_1.Business; }, function (business) { return business.services; })
    ], Service.prototype, "business");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return clientBooking_entity_1.ClientBooking; }, function (clientBooking) { return clientBooking.service; })
    ], Service.prototype, "clientBookings");
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Service.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Service.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)()
    ], Service.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)()
    ], Service.prototype, "minPrice");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        })
    ], Service.prototype, "maxPrice");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], Service.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], Service.prototype, "updatedAt");
    Service = __decorate([
        (0, typeorm_1.Entity)('services')
    ], Service);
    return Service;
}());
exports.Service = Service;
