import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentDto } from './create-component.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateComponentDto extends PartialType(CreateComponentDto) {

    @IsString()
    @IsOptional()
    clientId: string;

    @IsString()
    @IsOptional()
    _id: string;

}
