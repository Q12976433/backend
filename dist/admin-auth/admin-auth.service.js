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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin/admin.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AdminAuthService = class AdminAuthService {
    constructor(jwtService, adminService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
    }
    async authAdmin({ email, password }) {
        const user = await this.adminService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.ForbiddenException();
        }
        return user;
    }
    async adminLogin({ email, password }) {
        const user = await this.adminService.findByEmail(email);
        console.log(user);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.ForbiddenException();
        }
        if ("admin" !== user.role) {
            console.log(user.role);
            throw new common_1.ForbiddenException();
        }
        return await this.generateToken(email, user.role);
    }
    async generateToken(email, role) {
        const tokens = await this.getTokens(email, role);
        return tokens;
    }
    async getTokens(email, role) {
        const at = await this.jwtService.signAsync({
            email,
            role,
        }, {
            algorithm: "RS256",
            secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
            expiresIn: "15m",
        });
        return {
            access_token: at,
        };
    }
};
AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=admin-auth.service.js.map