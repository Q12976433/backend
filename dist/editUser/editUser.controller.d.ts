/// <reference types="multer" />
import { Request, Response } from "express";
import { EditUserService } from "./editUser.service";
import { EditUserDto } from "./dto/edit-user.dto";
export declare class EditUserController {
    private editUserService;
    constructor(editUserService: EditUserService);
    editUser(req: Request, dto: EditUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadFile(file: Express.Multer.File, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
