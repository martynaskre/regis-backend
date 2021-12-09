"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryEntity = void 0;
var typeorm_1 = require("typeorm");
var CategoryEntity = /** @class */ (function () {
    function CategoryEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], CategoryEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], CategoryEntity.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true,
            nullable: true
        })
    ], CategoryEntity.prototype, "slug");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'longtext'
        })
    ], CategoryEntity.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text'
        })
    ], CategoryEntity.prototype, "illustrationUrl");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; }
        })
    ], CategoryEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: 'timestamp',
            "default": function () { return 'NOW()'; },
            onUpdate: 'NOW()'
        })
    ], CategoryEntity.prototype, "updatedAt");
    CategoryEntity = __decorate([
        (0, typeorm_1.Entity)('categories')
    ], CategoryEntity);
    return CategoryEntity;
}());
exports.CategoryEntity = CategoryEntity;
