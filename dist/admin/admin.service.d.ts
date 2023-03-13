import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
export declare class AdminService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAllUser(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
}
