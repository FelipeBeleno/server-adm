


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


export interface MaterialesProducto {

    materialId: string;
    stockRequired: number; F

}

export interface Image {

    path: string;
    name: string;
    fullPath: string;

}