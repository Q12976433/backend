"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login({ email, password }) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.ForbiddenException();
        }
        const tokens = await this.getTokens(email);
        await this.updateRt(email, tokens.refresh_token);
        return tokens;
    }
    async logout(email) {
        await this.updateRt(email, null);
    }
    async refresh(email, rt) {
        const user = await this.userService.findByEmail(email);
        if (!user || !user.refreshToken)
            throw new common_1.NotFoundException();
        const decoded = await this.jwtService.verify(rt, {
            secret: process.env.REFRESH_TOKEN_SECRET_PUBLIC,
        });
        if (!decoded || typeof decoded === "string")
            throw new common_1.NotFoundException();
        if (user.refreshToken !== rt)
            throw new common_1.ForbiddenException();
        const newAccessToken = this.jwtService.signAsync({
            email,
        }, {
            algorithm: "RS256",
            secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
            expiresIn: "15m",
        });
        return { access_token: newAccessToken };
    }
    async verifyRt(rt) {
        const decoded = this.jwtService.verify(rt, {
            secret: process.env.REFRESH_TOKEN_SECRET_PUBLIC,
        });
        if (!decoded || typeof decoded === "string")
            throw new common_1.NotFoundException();
        return decoded;
    }
    async updateRt(email, rt) {
        await this.userService.updateByEmail(email, rt);
    }
    async getTokens(email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                email,
            }, {
                algorithm: "RS256",
                secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
                expiresIn: "15m",
            }),
            this.jwtService.signAsync({
                email,
            }, {
                algorithm: "RS256",
                secret: process.env.REFRESH_TOKEN_SECRET_PRIVATE,
                expiresIn: "7d",
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map