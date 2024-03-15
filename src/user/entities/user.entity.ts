import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ImageProduct } from "generic_schemas/Image_product";
import { DocumentType, Image, RolesEnum } from "interfaces/entities.interfaces";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";

@Schema({
    timestamps: true
})
export class User extends Document {

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
        type: Date
    })
    birthday: Date

    @Prop({
        type: ImageProduct,

    })
    image: Image

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

    @Prop({
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN", "USER"]
    })
    role: RolesEnum

    @Prop({
        type: String,
        unique: true
    })
    email: string;

    @Prop({
        type: String
    })
    password: string;

    @Prop({
        type:Boolean,
        default: true
    })
    status: boolean;

    @Prop({
        type: String
    })
    phone: string

}


export const UserSchema = SchemaFactory.createForClass(User);
