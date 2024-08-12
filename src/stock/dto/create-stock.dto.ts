import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {

    @ApiProperty({
        description: 'MongoDB ID of the component associated with the stock.',
        example: '60d0fe4f5311236168a109ca'
    })
    @IsMongoId()
    @IsString()
    componentId: string;

    @ApiProperty({
        description: 'Quantity of stock available. Must be at least 1.',
        example: 50,
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    stock: number;

    @ApiProperty({
        description: 'Value of the stock. Must be at least 100.',
        example: 1000,
        minimum: 100
    })
    @IsNumber()
    @Min(100)
    value: number;

    @ApiProperty({
        description: 'Due date of the stock, represented as a Date object.',
        example: '2024-12-31T00:00:00.000Z'
    })
    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @ApiProperty({
        description: 'MongoDB ID of the client associated with the stock.',
        example: '60d0fe4f5311236168a109cb'
    })
    @IsMongoId()
    @IsString()
    clientId: string;
}
