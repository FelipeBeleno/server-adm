import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentType } from "interfaces/entities.interfaces";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";


@Schema({
    timestamps: true
})
export class UserSale extends Document {
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
        type: String
    })
    phone: string

    @Prop({
        type: String
    })
    address: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

    @Prop({
        type: String
    })
    email: string

}

export const UserSaleSchema = SchemaFactory.createForClass(UserSale);
