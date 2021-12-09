"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBussinesDto = void 0;
var class_validator_1 = require("class-validator");
var Exists_1 = require("../../shared/validation/Exists");
var nestjs_form_data_1 = require("nestjs-form-data");
var CreateBussinesDto = /** @class */ (function () {
    function CreateBussinesDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateBussinesDto.prototype, "title");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateBussinesDto.prototype, "addressCountry");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateBussinesDto.prototype, "addressCity");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateBussinesDto.prototype, "addressStreet");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateBussinesDto.prototype, "addressHouseNumber");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateBussinesDto.prototype, "addressPostCode");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateBussinesDto.prototype, "shortDescription");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(255),
        (0, class_validator_1.MinLength)(1)
    ], CreateBussinesDto.prototype, "longDescription");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, Exists_1.Exists)({
            table: 'categories',
            column: 'id'
        })
    ], CreateBussinesDto.prototype, "categoryId");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, nestjs_form_data_1.IsFile)(),
        (0, nestjs_form_data_1.MaxFileSize)(2e6),
        (0, nestjs_form_data_1.HasMimeType)(['image/jpeg', 'image/png'])
    ], CreateBussinesDto.prototype, "cover");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, nestjs_form_data_1.IsFile)(),
        (0, nestjs_form_data_1.MaxFileSize)(2e6),
        (0, nestjs_form_data_1.HasMimeType)(['image/jpeg', 'image/png'])
    ], CreateBussinesDto.prototype, "logo");
    return CreateBussinesDto;
}());
exports.CreateBussinesDto = CreateBussinesDto;
