import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.schema";
import { Model } from "mongoose";
import { TaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
    async getAllTasks(filter: string, userId: string) {
        switch (filter) {
            case "all":
                return this.taskModel.find({userId})
            case "done":
                return this.taskModel.find({done: true, userId})
            case "undone":
                return this.taskModel.find({done: false, userId})
            default:
                return this.taskModel.find({userId})
        }
    }

    async createNewTask(dto: TaskDto & {userId: string}) {
        return this.taskModel.create(dto)
    }

    async editTask(id: string, task: TaskDto) {
        return this.taskModel.findByIdAndUpdate(id, {task: task.task}, {new: true})
    }

    async doneTask(id: string) {
        const task = await this.taskModel.findById(id)
        return await this.taskModel.findByIdAndUpdate(id,{ done: !task.done },{ new: true })
    }

    async deleteTask(id: string) {
        return this.taskModel.findByIdAndDelete(id)
    }
}