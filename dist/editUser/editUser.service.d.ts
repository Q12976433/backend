import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { EditUserDto } from "./dto/edit-user.dto";
import { EditUserAvatarDto } from "./dto/edit-userAvatar.dto";
export declare class EditUserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    updateNameByEmail(userEmail: string, dto: EditUserDto): Promise<{
        firstName: string;
        lastName: string;
    }>;
    findByEmail(userEmail: string): Promise<User>;
    updateAvatarByEmail(userEmail: string, dto: EditUserAvatarDto): Promise<User>;
}
