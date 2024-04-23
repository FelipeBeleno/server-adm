import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";



export class PaginationDto {


    @IsOptional()
    @IsPositive()
    @Min(1)
    @Transform(({ value }) => Number(value))
    limit: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => Number(value))
    offset: number;

    @IsOptional()
    @IsString()
    clientId: string;

}