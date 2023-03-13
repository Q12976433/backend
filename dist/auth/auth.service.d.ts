import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login({ email, password }: LoginUserDto): Promise<Tokens>;
    logout(email: string): Promise<void>;
    refresh(email: string, rt: string): Promise<{
        access_token: Promise<string>;
    }>;
    verifyRt(rt: string): Promise<any>;
    updateRt(email: string, rt: string): Promise<void>;
    getTokens(email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
