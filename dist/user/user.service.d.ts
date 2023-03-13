import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<(mongoose.Document<unknown, any, User> & User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)[]>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findByEmail(email: string): Promise<User>;
    findById(_id: string): Promise<User>;
    updateByEmail(email: string, rt: string): Promise<void>;
    doesUserExists(createUserDTO: CreateUserDto): Promise<User>;
    sendVerificationLink(email: string, firstName: string, lastName: string, password: string): any;
    decodeConfirmationToken(token: string): Promise<mongoose.Document<unknown, any, User> & User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
}
