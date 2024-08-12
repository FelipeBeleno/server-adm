import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsMongoId, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from "interfaces/entities.interfaces";

export class CreateUserSaleDto {

    @ApiProperty({
        description: 'Name of the user making the sale. Must be at least 3 characters long.',
        example: 'Alice Johnson',
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
        example: 'A12345678',
        minLength: 5
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    document: string;

    @ApiProperty({
        description: 'Email address of the user.',
        example: 'user@example.com'
    })
    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'MongoDB ID of the client associated with the sale.',
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
        description: 'Address of the user. Must be at least 3 characters long.',
        example: '123 Main St',
        minLength: 3
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    address: string;
}
