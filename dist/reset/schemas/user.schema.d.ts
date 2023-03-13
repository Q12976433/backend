import mongoose, { HydratedDocument } from "mongoose";
export declare type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    refreshToken: string;
    role: string;
    avatar: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
