import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type TaskDocument = HydratedDocument<Task>

@Schema({timestamps: true})
export class Task {
    @Prop({required: true})
    task: string

    @Prop({required: true})
    done: boolean

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task)