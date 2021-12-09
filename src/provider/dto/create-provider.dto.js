"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProviderDto = void 0;
var class_validator_1 = require("class-validator");
var Unique_1 = require("../../shared/validation/Unique");
var Match_1 = require("../../shared/validation/Match");
var CreateProviderDto = /** @class */ (function () {
    function CreateProviderDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)(),
        (0, Unique_1.Unique)({
            table: 'providers'
        })
    ], CreateProviderDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateProviderDto.prototype, "phoneNumber");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, Match_1.Match)('password')
    ], CreateProviderDto.prototype, "passwordConfirmation");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsIn)(['0', '1'])
    ], CreateProviderDto.prototype, "isLegalEntity");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (object) { return object.is_legal_entity == 1; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "companyName");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "code");
    __decorate([
        (0, class_validator_1.ValidateIf)(function (object) { return object.is_legal_entity == 1; }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProviderDto.prototype, "vatCode");
    return CreateProviderDto;
}());
exports.CreateProviderDto = CreateProviderDto;
