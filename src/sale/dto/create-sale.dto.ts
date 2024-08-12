import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsOptional, Min, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductDto } from "src/product/dto/update-product.dto";

class ProductSale extends UpdateProductDto {

    @ApiProperty({
        description: 'Quantity of the product being sold. Must be at least 1.',
        example: 5,
        minimum: 1
    })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({
        description: 'Total value of the product sale. Must be at least 100.',
        example: 500,
        minimum: 100
    })
    @IsInt()
    @Min(100)
    valueTotal: number;

    @ApiProperty({
        description: 'Selected option for the product, if any.',
        example: 'Color: Red',
        required: false
    })
    @IsOptional()
    selected: string;

    @ApiProperty({
        description: 'Additional property for the product, if any.',
        example: 'Size: M',
        required: false
    })
    @IsOptional()
    property: string;

    @ApiProperty({
        description: 'MongoDB ID of the product.',
        example: '60d0fe4f5311236168a109ca'
    })
    @IsMongoId()
    productId: string;
}

export class CreateSaleDto {

    @ApiProperty({
        description: 'List of products included in the sale. Each product must conform to the ProductSale schema.',
        type: [ProductSale]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @IsNotEmpty({ each: true })
    @Type(() => ProductSale)
    products: ProductSale[];

    @ApiProperty({
        description: 'Total value of the sale. Must be at least 100.',
        example: 1500,
        minimum: 100
    })
    @IsInt()
    @Min(100)
    valueSale: number;

    @ApiProperty({
        description: 'Total value of the sale including VAT. Must be at least 100.',
        example: 1800,
        minimum: 100
    })
    @IsInt()
    @Min(100)
    valueSaleIva: number;

    @ApiProperty({
        description: 'MongoDB ID of the client making the purchase.',
        example: '60d0fe4f5311236168a109ca'
    })
    @IsMongoId()
    clientId: string;

    @ApiProperty({
        description: 'MongoDB ID of the user making the sale.',
        example: '60d0fe4f5311236168a109cb'
    })
    @IsMongoId()
    userSale: string;

    @ApiProperty({
        description: 'Email of the user who registered the sale.',
        example: 'salesperson@example.com'
    })
    @IsEmail()
    userRegister: string;
}
