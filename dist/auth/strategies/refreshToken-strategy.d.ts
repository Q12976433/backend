import { Strategy } from "passport-jwt";
import { Request } from "express";
declare const refreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class refreshTokenStrategy extends refreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: any): any;
}
export {};
