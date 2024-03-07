import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator"
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
    password: string

}
