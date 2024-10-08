import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Client } from "src/client/entities/client.entity";
import { Component } from "src/component/entities/component.entity";



@Schema({
    timestamps: true
})
export class Stock extends Document {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'component'
    })
    componentId: mongoose.Schema.Types.ObjectId


    @Prop({
        type: Number,
        default: 0
    })
    stock: number;


    @Prop({
        type: Number,
        default: 0
    })
    value: number

    @Prop({
        type: Date
    })
    dueDate: Date;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    })
    clientId: Client;

    @Prop({
        type: Boolean,
        default: true
    })
    status: boolean;
    
}

export const StockSchema = SchemaFactory.createForClass(Stock);
