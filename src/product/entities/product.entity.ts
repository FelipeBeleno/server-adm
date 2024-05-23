import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ComponentProduct, } from "interfaces/entities.interfaces";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";



@Schema({
    timestamps: true
})
export class Product extends Document {

    @Prop([{

        componentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'component'
        },
        stockRequired: {
            type: Number,
            default: 0
        },
        name:{
            type: String
        },
        image: {
            type: String
        }

    }])
    components: ComponentProduct[]

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
        type: String,
    })
    image: string


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);