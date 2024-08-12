import { Type } from "class-transformer";
import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ComponentProduct, ComponentProductClass } from "interfaces/entities.interfaces";

export class CreateProductDto {

    @ApiProperty({
        description: 'List of product components. Each component should be non-empty and conform to the ComponentProductClass schema.',
        type: [ComponentProductClass]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @IsNotEmpty({ each: true })
    @Type(() => ComponentProductClass)
    components: ComponentProduct[];

    @ApiProperty({
        description: 'Value of the product. Must be an integer greater than or equal to 100.',
        example: 150
    })
    @IsInt()
    @Min(100)
    value: number;

    @ApiProperty({
        description: 'Name of the product. Must be at least 2 characters long.',
        example: 'Product Name',
        minLength: 2
    })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({
        description: 'Description of the product. Must be at least 2 characters long.',
        example: 'This is a product description',
        minLength: 2
    })
    @IsString()
    @MinLength(2)
    description: string;

    @ApiProperty({
        description: 'Optional image URL of the product.',
        example: 'https://example.com/image.png',
        required: false
    })
    @IsOptional()
    image: string;

    @ApiProperty({
        description: 'MongoDB ID of the associated client.',
        example: '60d0fe4f5311236168a109ca'
    })
    @IsMongoId()
    clientId: string;
}
