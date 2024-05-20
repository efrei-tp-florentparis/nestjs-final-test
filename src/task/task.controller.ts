import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './task.dto';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@ApiTags('task')
@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @ApiBody({ type: CreateTaskDto })
    async addTask(@Body() taskTada: CreateTaskDto): Promise<void> {
        const { name, userId, priority } = taskTada;

        if (!name || !userId) {
            throw new BadRequestException(`Name or userId is required`);
        }

        if (typeof userId !== 'number') {
            throw new BadRequestException(`userId must be a number`);
        }

        if (typeof userId !== 'number') {
            throw new BadRequestException(`userId must be a number`);
        }

        let parsedPriority: number | undefined;

        if (priority !== undefined) {
            if (typeof priority === 'string') {
                parsedPriority = parseInt(priority, 10);
                if (isNaN(parsedPriority)) {
                    throw new BadRequestException(
                        `Priority must be a valid integer`,
                    );
                }
            } else if (!Number.isInteger(priority)) {
                throw new BadRequestException(
                    `Priority must be a valid integer`,
                );
            }
        }

        return this.taskService.addTask(name, userId, parsedPriority);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (
            !userId ||
            !Number.isInteger(parseInt(userId, 10)) ||
            parseInt(userId, 10) < 0
        ) {
            throw new BadRequestException(`userId must be a valid integer`);
        }

        const parsedUserId = parseInt(userId, 10);

        return this.taskService.getUserTasks(parsedUserId);
    }

    @Get('/list')
    async getAllUsers(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }
}
