import { Transform } from "class-transformer"
import { IsBoolean, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from "class-validator"
import { DocumentType, RolesEnum } from "interfaces/entities.interfaces"

export class CreateUserDto {


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string

    @IsString()
    @IsEnum(DocumentType)
    documentType: DocumentType

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    document: string

    @IsString()
    @IsEnum(RolesEnum)
    role: RolesEnum

    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string


    @IsMongoId()
    @IsString()
    clientId: string;

    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    phone: string;

    @IsBoolean()
    status: boolean;


}
