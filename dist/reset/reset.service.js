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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("@nestjs/mongoose");
const mailgun = require("mailgun-js");
let ResetService = class ResetService {
    constructor(userModel, nestJwtService) {
        this.userModel = userModel;
        this.nestJwtService = nestJwtService;
    }
    async resetRequest({ email }) {
        const user = await this.findOneByEmail(email);
        console.log(user);
        if (!user) {
            console.log("User Not Found");
            throw new common_1.NotFoundException("User not found");
        }
        console.log("User exist!");
        const payload = {
            email: email,
        };
        const token = await this.nestJwtService.sign(payload);
        console.log(token);
        await this.sendPasswordResetEmail(email, token);
        return { message: "Email Sent Successfully" };
    }
    async resetPassword(token, resetPasswordDto) {
        try {
            const decodedToken = await this.verifyAsync(token.token);
            console.log(decodedToken);
            const userEmail = decodedToken.email;
            const hashedPassword = await this.hash(resetPasswordDto.password);
            console.log(resetPasswordDto.password);
            console.log(hashedPassword);
            await this.userModel
                .findOneAndUpdate({ email: userEmail }, { password: hashedPassword }, { new: true })
                .exec();
            console.log("Password has been updated");
            return { message: "Password has been updated" };
        }
        catch (error) {
            console.log("Invalid token");
            throw new common_1.UnauthorizedException("Invalid Token");
        }
    }
    async findOneByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async hash(password) {
        const saltRounds = 10;
        return (0, bcryptjs_1.hash)(password, saltRounds);
    }
    async sign(user) {
        const payload = { _id: user._id, email: user.email };
        return this.nestJwtService.sign(payload);
    }
    async verifyAsync(token) {
        return this.nestJwtService.verifyAsync(token);
    }
    async sendPasswordResetEmail(email, token) {
        const api_key = process.env.MAILGUN_API_KEY;
        const DOMAIN = process.env.MAILGUN_DOMAIN;
        const mg = mailgun({
            apiKey: api_key,
            domain: DOMAIN,
        });
        const data = {
            from: "FotoPie <unswmercury@gmail.com>",
            to: "jeremy.zeyuliu@gmail.com",
            subject: "Email Verification",
            html: `
          <p>Hi,</p>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p><a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a></p>
          <p>If you did not make this request, you can safely ignore this email.</p>
          <p>Best regards,</p>
          <p>FotoPie Support Team</p>
        `,
        };
        try {
            await mg.messages().send(data);
            console.log("Email has been sent");
            return { message: "Email has been sent" };
        }
        catch (error) {
            console.log("Failed to send email", error);
            throw new Error("Failed to send email");
        }
    }
};
ResetService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], ResetService);
exports.ResetService = ResetService;
//# sourceMappingURL=reset.service.js.map