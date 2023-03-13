import { AdminService } from "./admin.service";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<import("./schema/user.schema").User[]>;
}
