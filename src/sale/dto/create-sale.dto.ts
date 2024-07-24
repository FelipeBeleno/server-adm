import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsInt, IsMongoId, IsNotEmpty,  IsOptional,  Min, ValidateNested } from "class-validator";
import { CreateProductDto } from "src/product/dto/create-product.dto";
import { UpdateProductDto } from "src/product/dto/update-product.dto";
import { Product } from "src/product/entities/product.entity";


class ProductSale extends UpdateProductDto {


    @IsInt()
    @Min(1)
    quantity: number;

    @IsInt()
    @Min(100)
    valueTotal: number;

    @IsOptional()
    selected
    
    @IsOptional()
    property

    @IsMongoId()
    productId 
}

export class CreateSaleDto {


    @IsArray()
    @ValidateNested({ each: true })
    @IsNotEmpty({ each: true })
    @Type(() => ProductSale)
    products: ProductSale[]

    @IsInt()
    @Min(100)
    valueSale: number

    @IsInt()
    @Min(100)
    valueSaleIva: number

    @IsMongoId()
    clientId: string;

    @IsMongoId()
    userSale: string;
    
    @IsEmail()
    userRegister: string;

}
