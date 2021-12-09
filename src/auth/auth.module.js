"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var provider_strategy_1 = require("./strategies/provider.strategy");
var typeorm_1 = require("@nestjs/typeorm");
var provider_entity_1 = require("../provider/provider.entity");
var client_strategy_1 = require("./strategies/client.strategy");
var client_entity_1 = require("../client/client.entity");
var password_reset_entity_1 = require("./passwor-resets/password-reset.entity");
var password_reset_service_1 = require("./passwor-resets/password-reset.service");
var mail_module_1 = require("../mail/mail.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ({
                                    secretOrPrivateKey: configService.get('JWT_SECRET'),
                                    signOptions: {
                                        expiresIn: 2592000
                                    }
                                })];
                        });
                    }); },
                    inject: [config_1.ConfigService]
                }),
                typeorm_1.TypeOrmModule.forFeature([provider_entity_1.ProviderEntity, client_entity_1.Client, password_reset_entity_1.PasswordResetEntity]),
                mail_module_1.MailModule,
            ],
            providers: [
                auth_service_1.AuthService,
                provider_strategy_1.ProviderStrategy,
                client_strategy_1.ClientStrategy,
                password_reset_service_1.PasswordResetService,
            ],
            exports: [auth_service_1.AuthService, password_reset_service_1.PasswordResetService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
