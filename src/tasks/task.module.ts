import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./task.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [
        MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
        JwtModule.register({secret: "12345678", signOptions: {expiresIn: "7d"}})
    ]
})

export class TaskModule {}