import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskDto } from "./dto/task.dto";
import { JwtAuthGuard } from "src/utils/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOperation({ summary: 'Get all tasks for the logged-in user' })
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get("/all-tasks")
    async getAllTasks(@Query("filter") filter: string, @Req() req: any) {
        if (!req.user) {
            return []
        }
        const userId = req.user.userId
        return this.taskService.getAllTasks(filter, userId)
    }

    @ApiOperation({ summary: 'Create a new task' })
    @HttpCode(201)
    @Post("/create-task")
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async createNewTask(@Body() dto: TaskDto, @Req() req: any) {
        const userId = req.user.userId
        const task = { ...dto, userId, done: dto.done ?? false }
        await this.taskService.createNewTask(task)
        return {success: true, message: "Successfully created."}
    }

    @ApiOperation({ summary: 'Edit the task' })
    @HttpCode(200)
    @Put("/edit-task/:id")
    @UsePipes(ValidationPipe)
    async editTask(@Param("id") id: string, @Body() task: TaskDto) {
        return this.taskService.editTask(id, task)
    }

    @ApiOperation({ summary: 'Toggle your task status - done/undone' })
    @HttpCode(200)
    @Put("/done-task/:id")
    async doneTask(@Param("id") id: string) {
        return this.taskService.doneTask(id)
    }

    @ApiOperation({ summary: 'delete a task' })
    @HttpCode(200)
    @Delete("/delete-task/:id")
    async deleteTask(@Param("id") id: string) {
        this.taskService.deleteTask(id)
        return
    }
}