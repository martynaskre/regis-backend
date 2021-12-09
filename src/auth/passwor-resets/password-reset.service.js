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
exports.PasswordResetService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var password_reset_entity_1 = require("./password-reset.entity");
var provider_entity_1 = require("../../provider/provider.entity");
var client_entity_1 = require("../../client/client.entity");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var PasswordResetService = /** @class */ (function () {
    function PasswordResetService(passwordResetRepository, mailService) {
        this.passwordResetRepository = passwordResetRepository;
        this.mailService = mailService;
    }
    PasswordResetService.prototype.createPasswordReset = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordReset, token, expiresAt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passwordReset = new password_reset_entity_1.PasswordResetEntity();
                        return [4 /*yield*/, (0, utils_1.hash)(new Date().toDateString() + entity.email)];
                    case 1:
                        token = _a.sent();
                        expiresAt = new Date();
                        expiresAt.setMinutes(new Date().getMinutes() + 15);
                        passwordReset.type =
                            entity instanceof provider_entity_1.ProviderEntity ? 'provider' : 'client';
                        passwordReset.email = entity.email;
                        passwordReset.token = token;
                        passwordReset.expiresAt = expiresAt;
                        return [4 /*yield*/, this.passwordResetRepository.save(passwordReset)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    PasswordResetService.prototype.handlePasswordForget = function (fetchEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchEntity()];
                    case 1:
                        entity = _a.sent();
                        if (!entity) {
                            (0, utils_1.throwValidationException)({
                                email: 'Provided email address is invalid.'
                            });
                        }
                        return [4 /*yield*/, this.createPasswordReset(entity)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, this.mailService.sendMail(entity.email, 'Slaptažodžio atkūrimo užklausa', 'reset-password', {
                                entity: entity,
                                token: token,
                                actionUrl: (0, utils_1.formatFrontUrl)(entity instanceof client_entity_1.Client
                                    ? types_1.FrontEndpoint.CLIENT_PASSWORD_RESET
                                    : types_1.FrontEndpoint.PROVIDER_PASSWORD_RESET, {
                                    token: token,
                                    email: entity.email
                                })
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PasswordResetService.prototype.handlePasswordReset = function (type, token, email, updateEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordResetEntity, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetRepository.findOne({
                            token: token
                        })];
                    case 1:
                        passwordResetEntity = _a.sent();
                        if (!passwordResetEntity ||
                            passwordResetEntity.email !== email ||
                            passwordResetEntity.type !== type) {
                            (0, utils_1.throwValidationException)({
                                email: 'Provided email address is invalid.'
                            });
                        }
                        return [4 /*yield*/, updateEntity()];
                    case 2:
                        entity = _a.sent();
                        return [4 /*yield*/, this.passwordResetRepository["delete"]({
                                token: token
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.mailService.sendMail(email, 'Jūsų slaptažodis buvo pakeistas', 'password-changed', {
                                firstName: entity.firstName
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PasswordResetService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(password_reset_entity_1.PasswordResetEntity))
    ], PasswordResetService);
    return PasswordResetService;
}());
exports.PasswordResetService = PasswordResetService;
