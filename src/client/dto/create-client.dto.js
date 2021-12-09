"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateClientDto = void 0;
var class_validator_1 = require("class-validator");
var Match_1 = require("../../shared/validation/Match");
var Unique_1 = require("../../shared/validation/Unique");
var CreateClientDto = /** @class */ (function () {
    function CreateClientDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateClientDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateClientDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateClientDto.prototype, "phoneNumber");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)(),
        (0, Unique_1.Unique)({
            table: 'clients'
        })
    ], CreateClientDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateClientDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, Match_1.Match)('password')
    ], CreateClientDto.prototype, "passwordConfirmation");
    return CreateClientDto;
}());
exports.CreateClientDto = CreateClientDto;
