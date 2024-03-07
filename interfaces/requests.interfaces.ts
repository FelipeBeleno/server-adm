import { Request } from "express";

export interface RequestUser extends Request {
    user: {
        name: string,
        role: string,
        email: string,

    }
}