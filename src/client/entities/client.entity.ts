import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentType, PackageEnum, PaymentHistory } from "interfaces/entities.interfaces";
import { Document } from "mongoose";


@Schema({
    timestamps: true
})
export class Client extends Document {

    @Prop({
        type: String
    })
    name: string;

    @Prop({
        type: String,
        enum: ["CEDULA DE CIUDADANIA", "CEDULA EXTRANGERIA", "NIT"]
    })
    documentType: DocumentType;

    @Prop({
        type: String
    })
    document: string;

    @Prop({
        type: Boolean,
        default: true
    })
    isSubscription: boolean;

    @Prop({
        type: Number,
        max: 30,
        min: 1,
        default: 15
    })
    payDay: number

    @Prop([
        {
            date: Date,
            value: Number
        }
    ])
    paymentHistory: PaymentHistory;

    @Prop({
        type: Number,
        default: 0
    })
    payRate: number;

    @Prop({
        type: String,
        default: ''
    })
    image

    @Prop({
        type: String,
        enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED']
    })
    package: PackageEnum

    @Prop({
        type: String
    })
    phone: string


    @Prop({
        type: String
    })
    address: string

    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;

}





export const ClientSchema = SchemaFactory.createForClass(Client);