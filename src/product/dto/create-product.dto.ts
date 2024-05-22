import { Type } from "class-transformer";
import { IsArray, IsInt, IsMongoId, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { ComponentProduct, ComponentProductClass } from "interfaces/entities.interfaces";

export class CreateProductDto {


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() =>  ComponentProductClass)
    components: ComponentProduct[]

    @IsInt()
    @Min(100)
    value: number

    @IsString()
    @MinLength(2)
    name: string

    @IsString()
    @MinLength(2)
    description: string
    
    @IsOptional()
    image: string;

    @IsMongoId()
    clientId: string;

}
