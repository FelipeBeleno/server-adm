import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, PackageEnum } from "interfaces/entities.interfaces";

export class CreateClientDto {

    @ApiProperty({
        description: 'Name of the client',
        example: 'John Doe',
        minLength: 3
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Type of document',
        example: 'CEDULA DE CIUDADANIA',
        enum: DocumentType
    })
    @IsString()
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @ApiProperty({
        description: 'Document number',
        example: '12345678',
        minLength: 5
    })
    @Transform(({ value }) => value.trim())
    @MinLength(5)
    @IsString()
    document: string;

    @ApiProperty({
        description: 'Indicates if the client has a subscription',
        example: true
    })
    @IsBoolean()
    isSubscription: boolean;

    @ApiProperty({
        description: 'Day of the month the client pays',
        example: 15
    })
    @IsInt()
    payDay: number;

    @ApiProperty({
        description: 'Package type selected by the client',
        example: 'INTERMEDIATE',
        enum: PackageEnum
    })
    @IsString()
    @IsEnum(PackageEnum)
    package: PackageEnum;

    @ApiProperty({
        description: 'Rate of payment',
        example: 200
    })
    @IsInt()
    payRate: number;

    @ApiProperty({
        description: 'Email of the client',
        example: 'john.doe@example.com'
    })
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Phone number of the client',
        example: '+123456789',
        minLength: 6
    })
    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Address of the client',
        example: '123 Main St',
        minLength: 7
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(7)
    address: string;

    @ApiProperty({
        description: 'Status of the client',
        example: true
    })
    @IsBoolean()
    status: boolean;
}
