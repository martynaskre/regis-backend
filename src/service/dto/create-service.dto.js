"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateServiceDto = void 0;
var class_validator_1 = require("class-validator");
var CreateServiceDto = /** @class */ (function () {
    function CreateServiceDto() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateServiceDto.prototype, "businessId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateServiceDto.prototype, "title");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateServiceDto.prototype, "description");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0)
    ], CreateServiceDto.prototype, "minPrice");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], CreateServiceDto.prototype, "maxPrice");
    return CreateServiceDto;
}());
exports.CreateServiceDto = CreateServiceDto;
