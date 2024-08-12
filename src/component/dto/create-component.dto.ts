import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateComponentDto {

    @ApiProperty({
        description: 'Name of the entity, should be at least 3 characters long.',
        example: 'Client Name',
        minLength: 3
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Description of the entity, should be at least 3 characters long.',
        example: 'This is a description of the client',
        minLength: 3
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    description: string;

}
