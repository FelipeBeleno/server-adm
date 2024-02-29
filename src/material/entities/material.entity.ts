import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ImageProduct } from "generic_schemas/Image_product";
import { Image } from "interfaces/entities.interfaces";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";



@Schema({
    timestamps: true
})
export class Material extends Document {

    @Prop({
        type: String
    })
    name: string;

    @Prop({
        type: String
    })
    description: string;


    @Prop({
        type: ImageProduct
    })
    image: Image;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

}






export const MaterialSchema = SchemaFactory.createForClass(Material);
