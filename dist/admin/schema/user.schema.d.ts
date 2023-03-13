import mongoose, { Document } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string;
    role: string;
    avatar: string;
    avatarPath: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
