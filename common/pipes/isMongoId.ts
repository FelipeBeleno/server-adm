import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateIdMongoPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        if (!isValidObjectId(value)) throw new BadRequestException(`${value} no es id valido`)

        return value;
    }
}