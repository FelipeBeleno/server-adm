import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, RolesEnum } from "interfaces/entities.interfaces";

export class CreateUserDto {

    @ApiProperty({
        description: 'Name of the user. Must be at least 3 characters long.',
        example: 'John Doe',
        minLength: 3
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Type of document used by the user.',
        enum: DocumentType,
        example: DocumentType.CC
    })
    @IsString()
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @ApiProperty({
        description: 'Document number of the user. Must be at least 5 characters long.',
        example: '123456789',
        minLength: 5
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    document: string;

    @ApiProperty({
        description: 'Role assigned to the user.',
        enum: RolesEnum,
        example: RolesEnum.ADMIN
    })
    @IsString()
    @IsEnum(RolesEnum)
    role: RolesEnum;

    @ApiProperty({
        description: 'Email address of the user.',
        example: 'user@example.com'
    })
    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user. Must be at least 6 characters long. This field is optional.',
        example: 'password123',
        minLength: 6,
        required: false
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string;

    @ApiProperty({
        description: 'MongoDB ID of the client associated with the user.',
        example: '60d0fe4f5311236168a109ca'
    })
    @IsMongoId()
    @IsString()
    clientId: string;

    @ApiProperty({
        description: 'Phone number of the user. Must be at least 6 characters long.',
        example: '+1234567890',
        minLength: 6
    })
    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Status of the user. Indicates whether the user is active or not.',
        example: true
    })
    @IsBoolean()
    status: boolean;
}
