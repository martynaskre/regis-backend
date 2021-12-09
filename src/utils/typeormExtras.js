"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
typeorm_1.SelectQueryBuilder.prototype.whereExists = function (query) {
    return this.where("EXISTS (" + query.getQuery() + ")", query.getParameters());
};
typeorm_1.SelectQueryBuilder.prototype.andWhereExists = function (query) {
    return this.andWhere("EXISTS (" + query.getQuery() + ")", query.getParameters());
};
typeorm_1.SelectQueryBuilder.prototype.orWhereExists = function (query) {
    return this.orWhere("EXISTS (" + query.getQuery() + ")", query.getParameters());
};
