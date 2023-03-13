import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ResetRequestDto } from "./dto/reset-request.dto";
export declare class ResetService {
    private userModel;
    private readonly nestJwtService;
    private readonly mailgunClient;
    constructor(userModel: Model<User>, nestJwtService: NestJwtService);
    resetRequest({ email }: ResetRequestDto): Promise<{
        message: string;
    }>;
    resetPassword(token: {
        token: string;
    }, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    findOneByEmail(email: string): Promise<User>;
    hash(password: string): Promise<string>;
    sign(user: User): Promise<string>;
    verifyAsync(token: string): Promise<{
        email: string;
    }>;
    sendPasswordResetEmail(email: string, token: string): Promise<{
        message: string;
    }>;
}
