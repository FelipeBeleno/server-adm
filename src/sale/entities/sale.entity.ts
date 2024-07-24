import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Product } from "src/product/entities/product.entity";

@Schema({
    timestamps: true
})
export class Sale extends Document {
    @Prop([{

        clientId: {
            type: String
        },
        name: {
            type: String
        },
        quantity: {
            type: Number
        },
        value: {
            type: Number
        },
        valueTotal: {
            type: Number
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }
    ])
    products: Array<any>;

    @Prop({
        type: Number
    })
    valueSale: number;

    @Prop({
        type: Number
    })
    valueSaleIva: number;

    @Prop({
        type: String
    })
    userSale: string;

    @Prop({
        type: String
    })
    codeSale: string;

    @Prop({
        type: String
    })
    clientId: string;

    @Prop({
        type: String,
    })
    userRegister: string;
    createdAt: Date;

}

export const SaleSchema = SchemaFactory.createForClass(Sale);
