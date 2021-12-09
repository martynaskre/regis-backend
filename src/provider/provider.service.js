"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProviderService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var provider_entity_1 = require("./provider.entity");
var utils_1 = require("../utils");
var types_1 = require("../types");
var ProviderService = /** @class */ (function () {
    function ProviderService(providerRepository, mailService, passwordResetService) {
        this.providerRepository = providerRepository;
        this.mailService = mailService;
        this.passwordResetService = passwordResetService;
    }
    ProviderService.prototype.create = function (providerData) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider = new provider_entity_1.ProviderEntity();
                        provider.firstName = providerData.firstName;
                        provider.lastName = providerData.lastName;
                        provider.email = providerData.email;
                        _a = provider;
                        return [4 /*yield*/, (0, utils_1.hash)(providerData.password)];
                    case 1:
                        _a.password = _b.sent();
                        provider.phoneNumber = providerData.phoneNumber;
                        provider.isLegalEntity = providerData.isLegalEntity == '1';
                        provider.code = providerData.code;
                        if (provider.isLegalEntity) {
                            provider.companyName = providerData.companyName;
                            provider.vatCode = providerData.vatCode;
                        }
                        return [4 /*yield*/, this.mailService.sendMail(provider.email, 'Sveikiname prisijungus!', 'provider-welcome', {
                                firstName: provider.firstName,
                                actionUrl: (0, utils_1.formatFrontUrl)(types_1.FrontEndpoint.PROVIDER_LOGIN)
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.providerRepository.save(provider)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.login = function (providerLogin) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.providerRepository.findOne({
                            email: providerLogin.email
                        })];
                    case 1:
                        provider = _b.sent();
                        _a = !provider;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.compareHash)(providerLogin.password, provider.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            (0, utils_1.throwValidationException)({
                                email: 'These credentials do not match our records.'
                            });
                        }
                        return [2 /*return*/, {
                                email: provider.email,
                                sub: provider.id,
                                type: 'provider'
                            }];
                }
            });
        });
    };
    ProviderService.prototype.forgotPassword = function (forgotPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetService.handlePasswordForget(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.providerRepository.findOne({
                                            email: forgotPassword.email
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.resetPassword = function (resetPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetService.handlePasswordReset('provider', resetPassword.token, resetPassword.email, function () { return __awaiter(_this, void 0, void 0, function () {
                            var provider, _a, _b;
                            var _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, this.providerRepository.findOne({
                                            email: resetPassword.email
                                        })];
                                    case 1:
                                        provider = _d.sent();
                                        _b = (_a = this.providerRepository).save;
                                        _c = {
                                            id: provider.id
                                        };
                                        return [4 /*yield*/, (0, utils_1.hash)(resetPassword.password)];
                                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                                _c)])];
                                    case 3:
                                        _d.sent();
                                        return [2 /*return*/, provider];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.ProviderEntity))
    ], ProviderService);
    return ProviderService;
}());
exports.ProviderService = ProviderService;
