import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { DocumentType, PackageEnum } from "interfaces/entities.interfaces";

export class CreateClientDto {


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @Transform(({ value }) => value.trim())
    @MinLength(5)
    @IsString()
    document: string;

    @IsBoolean()
    isSubscription: boolean;

    @IsInt()
    payDay: number;

    @IsString()
    @IsEnum(PackageEnum)
    package: PackageEnum;

    @IsInt()
    payRate: number;

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    phone: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(7)
    address: string;

}
