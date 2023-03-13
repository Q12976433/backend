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
exports.EditUserController = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const uuid_1 = require("uuid");
const sharp = require("sharp");
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const editUser_service_1 = require("./editUser.service");
const jwt_auth_guards_1 = require("../auth/guards/jwt-auth.guards");
const edit_user_dto_1 = require("./dto/edit-user.dto");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
let EditUserController = class EditUserController {
    constructor(editUserService) {
        this.editUserService = editUserService;
    }
    async editUser(req, dto, res) {
        const userEmail = req.user["email"];
        const updatedData = await this.editUserService.updateNameByEmail(userEmail, dto);
        if (!updatedData) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "success",
            updatedData,
        });
    }
    async me(req, res) {
        const userEmail = req.user["email"];
        const user = await this.editUserService.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        const { firstName, lastName, avatar, avatarPath, _id } = user;
        return res.status(common_1.HttpStatus.OK).json({
            message: "success",
            firstName,
            lastName,
            avatar,
            avatarPath,
            id: _id,
        });
    }
    async uploadFile(file, req, res) {
        const fileName = `user-${(0, uuid_1.v4)()}.jpeg`;
        const fileBuffer = await sharp(file.buffer)
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 10 })
            .toBuffer();
        const s3Clinet = new client_s3_1.S3Client({
            region: bucketRegion,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
        });
        try {
            await s3Clinet.send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Body: fileBuffer,
                Key: fileName,
                ContentType: file.mimetype,
            }));
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        const userEmail = req.user["email"];
        const user = await this.editUserService.updateAvatarByEmail(userEmail, {
            avatar: fileName,
            avatarPath: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`,
        });
        const { avatar, avatarPath } = user;
        if (!user) {
            throw new common_1.HttpException("error", common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "success",
            avatar,
            avatarPath,
        });
    }
};
__decorate([
    (0, common_1.Patch)("/updateName"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_user_dto_1.EditUserDto, Object]),
    __metadata("design:returntype", Promise)
], EditUserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EditUserController.prototype, "me", null);
__decorate([
    (0, common_1.Patch)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith("image")) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException("Not an image! Please upload only images.", common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EditUserController.prototype, "uploadFile", null);
EditUserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Controller)("editUser"),
    __metadata("design:paramtypes", [editUser_service_1.EditUserService])
], EditUserController);
exports.EditUserController = EditUserController;
//# sourceMappingURL=editUser.controller.js.map