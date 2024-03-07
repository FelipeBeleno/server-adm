import { UseGuards, applyDecorators } from "@nestjs/common";
import { RolesEnum } from "interfaces/entities.interfaces";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";



export function Auth(roles: RolesEnum[]) {
    return applyDecorators(
        Roles([...roles, RolesEnum.SUPER_ADMIN]),
        UseGuards(AuthGuard, RolesGuard)
    )
}