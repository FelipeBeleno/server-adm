import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";
import { Product } from "src/product/entities/product.entity";
import { UserSale } from "src/user-sale/entities/user-sale.entity";




@Schema({
    timestamps: true
})
export class Sale extends Document {

    @Prop([Product])
    products: Product

    @Prop({
        type: Number
    })
    valueSale: number;

    @Prop({
        type: Number
    })
    valueSaleIva: number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user-sale'
    })
    userSale: UserSale

    @Prop({
        type: String
    })
    codeSale: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

}

export const SaleSchema = SchemaFactory.createForClass(Sale);
