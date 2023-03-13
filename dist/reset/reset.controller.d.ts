import { ResetService } from "./reset.service";
import { ResetRequestDto } from "./dto/reset-request.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
export declare class ResetController {
    private resetService;
    constructor(resetService: ResetService);
    resetRequest(email: ResetRequestDto): Promise<{
        message: string;
    }>;
    resetPassword(token: {
        token: string;
    }, newPassword: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
