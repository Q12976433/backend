import { AdminLoginDto } from "./dto/admin-login.dto";
import { Token } from "./types/tokens.type";
import { AdminAuthService } from "./admin-auth.service";
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    adminLogin(adminLoginDto: AdminLoginDto): Promise<Token>;
}
