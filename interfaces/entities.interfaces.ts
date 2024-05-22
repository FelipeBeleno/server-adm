


export enum DocumentType {
    CC = "CEDULA DE CIUDADANIA",
    CE = "CEDULA EXTRANGERIA",
    NIT = "NIT"
}

export enum PackageEnum {
    BASIC = 'BASIC',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}


export enum RolesEnum {

    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER"

}


export interface Route {
    route: string;
    access: string[]
}

export interface PaymentHistory {
    date: Date,
    value: number
}


export interface ComponentProduct {

    componentId: string;
    stockRequired: number; 

}

export class ComponentProductClass {
    componentId: string;
    stockRequired: number; 
}

export interface Image {

    path: string;
    name: string;
    fullPath: string;

}