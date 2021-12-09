"use strict";
exports.__esModule = true;
exports.Match = void 0;
var class_validator_1 = require("class-validator");
function Match(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate: function (value, args) {
                    var relatedPropertyName = args.constraints[0];
                    var relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage: function (args) {
                    var relatedPropertyName = args.constraints[0];
                    return "$property must match " + relatedPropertyName + " exactly";
                }
            }
        });
    };
}
exports.Match = Match;
