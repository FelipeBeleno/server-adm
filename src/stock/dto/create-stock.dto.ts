import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNumber, IsString, Min } from "class-validator"

export class CreateStockDto {

    @IsMongoId()
    @IsString()
    componentId: string;

    @IsNumber()
    @Min(1)
    stock: number;

    @IsNumber()
    @Min(100)
    value: number;


    @IsDate()
    @Type(() => Date)  
    dueDate: Date

    @IsMongoId()
    @IsString()
    clientId: string;


}
