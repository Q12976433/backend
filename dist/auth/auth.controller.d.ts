import { LoginUserDto } from "./dto/login-user.dto";
import { Tokens } from "./types/tokens.type";
import { Request } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<Tokens>;
    refreshAccessToken(req: Request): Promise<{
        access_token: Promise<string>;
    }>;
    logout(req: Request): Promise<void>;
}
