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
exports.ResetController = void 0;
const common_1 = require("@nestjs/common");
const reset_service_1 = require("./reset.service");
const reset_request_dto_1 = require("./dto/reset-request.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let ResetController = class ResetController {
    constructor(resetService) {
        this.resetService = resetService;
    }
    async resetRequest(email) {
        return this.resetService.resetRequest(email);
    }
    async resetPassword(token, newPassword) {
        return this.resetService.resetPassword(token, newPassword);
    }
};
__decorate([
    (0, common_1.Post)("resetRequest"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_request_dto_1.ResetRequestDto]),
    __metadata("design:returntype", Promise)
], ResetController.prototype, "resetRequest", null);
__decorate([
    (0, common_1.Post)("resetPassword"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], ResetController.prototype, "resetPassword", null);
ResetController = __decorate([
    (0, common_1.Controller)("reset"),
    __metadata("design:paramtypes", [reset_service_1.ResetService])
], ResetController);
exports.ResetController = ResetController;
//# sourceMappingURL=reset.controller.js.map