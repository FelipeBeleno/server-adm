import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {

    @ApiProperty({ description: 'El email del usuario', example: 'mail@mail.com' })
    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string


    @ApiProperty({ description: 'Contraseña del usuario', example: 'contraseña de usuario' })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string

}
