import { Prop } from "@nestjs/mongoose";

export class ImageProduct {

    @Prop({
        type: String
    })
    name: string;

    @Prop({
        type: String
    })
    path: string;

    @Prop({
        type: String
    })
    fullPath: string

}