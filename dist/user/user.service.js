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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const mailgun = require("mailgun-js");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    create(createUserDto) {
        return "This action adds a new user";
    }
    findAll() {
        const users = this.userModel.find().exec();
        if (!users)
            throw new common_1.NotFoundException();
        return users;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async findById(_id) {
        const user = await this.userModel.findOne({ _id }).exec();
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async updateByEmail(email, rt) {
        const user = await this.userModel.updateOne({ email }, { refreshToken: rt });
        if (!user)
            throw new common_1.NotFoundException();
        return null;
    }
    async doesUserExists(createUserDTO) {
        const user = await this.userModel.findOne({ email: createUserDTO.email });
        if (user) {
            throw new common_1.ConflictException("User already exist");
        }
        return user;
    }
    sendVerificationLink(email, firstName, lastName, password) {
        const payload = {
            email,
            firstName,
            lastName,
            password,
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACTIVIATE_SECRET_KEY,
            expiresIn: process.env.EXPIRE,
        });
        const url = `${process.env.EMAIL_CONFIRMATION_URL}/${token}`;
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
        const DOMAIN = process.env.DOMAIN;
        const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
        try {
            return mg.messages().send({
                from: process.env.EMAIL_SEND,
                to: email,
                subject: "Email confirmation",
                text,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to send email");
        }
    }
    async decodeConfirmationToken(token) {
        const payload = await this.jwtService.verify(token, {
            secret: process.env.JWT_ACTIVIATE_SECRET_KEY,
        });
        const { firstName, lastName, email, password } = payload;
        const hash = await bcrypt.hash(password, 5);
        if (await this.userModel.findOne({ email })) {
            throw new common_1.ConflictException("User already exist");
        }
        else {
            try {
                const createduser = new this.userModel({
                    firstName,
                    lastName,
                    password: hash,
                    email,
                });
                return await createduser.save();
            }
            catch (error) {
                throw new common_1.UnauthorizedException("Invalid Token");
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map