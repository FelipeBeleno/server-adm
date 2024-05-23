import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {


    @IsMongoId()
    @IsOptional()
    _id?: string;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;

    @IsOptional()
    __v?: number;


}
