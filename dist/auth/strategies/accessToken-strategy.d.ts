import { Strategy } from "passport-jwt";
declare const accessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class accessTokenStrategy extends accessTokenStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        email: any;
    }>;
}
export {};
