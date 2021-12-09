"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PaginatedProviderBookingsResultDto = exports.PaginatedClientBookingsResultDto = exports.PaginatedServicesResultDto = exports.PaginatedBusinessesResultDto = exports.PaginationDto = void 0;
var clientBooking_entity_1 = require("../../booking/clientBooking.entity");
var providerBooking_entity_1 = require("../../booking/providerBooking.entity");
var PaginationDto = /** @class */ (function () {
    function PaginationDto() {
        this.page = 1;
        this.limit = 10;
    }
    return PaginationDto;
}());
exports.PaginationDto = PaginationDto;
var PaginatedBusinessesResultDto = /** @class */ (function (_super) {
    __extends(PaginatedBusinessesResultDto, _super);
    function PaginatedBusinessesResultDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PaginatedBusinessesResultDto;
}(PaginationDto));
exports.PaginatedBusinessesResultDto = PaginatedBusinessesResultDto;
var PaginatedServicesResultDto = /** @class */ (function (_super) {
    __extends(PaginatedServicesResultDto, _super);
    function PaginatedServicesResultDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PaginatedServicesResultDto;
}(PaginationDto));
exports.PaginatedServicesResultDto = PaginatedServicesResultDto;
var PaginatedClientBookingsResultDto = /** @class */ (function (_super) {
    __extends(PaginatedClientBookingsResultDto, _super);
    function PaginatedClientBookingsResultDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PaginatedClientBookingsResultDto;
}(PaginationDto));
exports.PaginatedClientBookingsResultDto = PaginatedClientBookingsResultDto;
var PaginatedProviderBookingsResultDto = /** @class */ (function (_super) {
    __extends(PaginatedProviderBookingsResultDto, _super);
    function PaginatedProviderBookingsResultDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PaginatedProviderBookingsResultDto;
}(PaginationDto));
exports.PaginatedProviderBookingsResultDto = PaginatedProviderBookingsResultDto;
