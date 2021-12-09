"use strict";
exports.__esModule = true;
function getLogLevels(isProduction) {
    if (isProduction) {
        return ['log', 'warn', 'error'];
    }
    return ['error', 'warn', 'log', 'verbose', 'debug'];
}
exports["default"] = getLogLevels;
