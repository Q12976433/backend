import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { User } from "./schemas/user.schema";
import { ConfirmEmailDto } from "./dto/confirmEmail.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): string;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
    addUser(res: any, createUserDTO: CreateUserDto): Promise<User>;
    register(res: any, ConfirmEmailDto: ConfirmEmailDto): Promise<User>;
}
