import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSaleDto } from './create-user-sale.dto';

export class UpdateUserSaleDto extends PartialType(CreateUserSaleDto) {}
