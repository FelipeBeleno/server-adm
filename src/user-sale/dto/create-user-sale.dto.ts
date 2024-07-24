import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsMongoId, IsString, MinLength } from "class-validator";
import { DocumentType } from "interfaces/entities.interfaces"

export class CreateUserSaleDto {

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


    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string


    @IsMongoId()
    @IsString()
    clientId: string;

    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    phone: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    address: string;
}
