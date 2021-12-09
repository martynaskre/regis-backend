"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Client = void 0;
var clientBooking_entity_1 = require("../booking/clientBooking.entity");
var typeorm_1 = require("typeorm");
var Client = /** @class */ (function () {
    function Client() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Client.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return clientBooking_entity_1.ClientBooking; }, function (clientBooking) { return clientBooking.client; })
    ], Client.prototype, "clientBookings");
    __decorate([
        (0, typeorm_1.Column)()
    ], Client.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)()
    ], Client.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], Client.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], Client.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], Client.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], Client.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], Client.prototype, "updatedAt");
    Client = __decorate([
        (0, typeorm_1.Entity)('clients')
    ], Client);
    return Client;
}());
exports.Client = Client;
