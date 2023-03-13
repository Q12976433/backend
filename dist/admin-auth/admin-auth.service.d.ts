import { User } from "../admin/schema/user.schema";
import { AdminService } from "src/admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./types/tokens.type";
import { AdminLoginDto } from "./dto/admin-login.dto";
export declare class AdminAuthService {
    private jwtService;
    private readonly adminService;
    constructor(jwtService: JwtService, adminService: AdminService);
    authAdmin({ email, password }: AdminLoginDto): Promise<User>;
    adminLogin({ email, password }: AdminLoginDto): Promise<Token>;
    generateToken(email: string, role: string): Promise<Token>;
    getTokens(email: string, role: string): Promise<{
        access_token: string;
    }>;
}
