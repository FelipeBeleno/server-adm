import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ImageProduct } from "generic_schemas/Image_product";
import { Image, MaterialesProducto } from "interfaces/entities.interfaces";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";



@Schema({
    timestamps: true
})
export class Product extends Document {

    @Prop([{

        materialId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'material'
        },
        stockRequired: {
            type: Number,
            default: 0
        }

    }])
    materials: MaterialesProducto[]

    @Prop({
        type: Number
    })
    value: number

    @Prop({
        type: String,

    })
    name: string

    @Prop({
        type: String,

    })
    description: string

    @Prop({
        type: ImageProduct,

    })
    image: Image


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

}

export const ProductSchema = SchemaFactory.createForClass(Product);