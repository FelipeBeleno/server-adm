import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "interfaces/entities.interfaces";


export const Roles =(role: RolesEnum[])=> SetMetadata('roles', role);