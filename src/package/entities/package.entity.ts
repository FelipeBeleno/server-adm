import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PackageEnum, Route } from "interfaces/entities.interfaces";


@Schema({
    timestamps: true
})
export class Package extends Document {

    @Prop({
        type: String,
        enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED']
    })
    name: PackageEnum

    @Prop(
        [
            {
                route: String,
                access: [{
                    type: [String],
                    enum: ["SUPER_ADMIN", "ADMIN", "USER"]
                }]
            }
        ]
    )
    routes: Route

    @Prop({
        type: Number,
        default: 0
    })
    value: number;

    @Prop({
        type: String
    })
    description: string;

    @Prop([String])
    characteristics: string[]

    @Prop({
        type: Boolean,
        default: false
    })
    hidden: boolean
}


export const PackageSchema = SchemaFactory.createForClass(Package);



