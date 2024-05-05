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
import { UserService } from '../user/user.service';
import { Task } from '@prisma/client';
import { parse } from 'path';

@ApiTags('task')
@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
    ) {}

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
    async getUserTasks(@Param('userId') userId: number): Promise<Task[]> {
        if (!userId) {
            throw new BadRequestException(`Name or userId is required`);
        }

        let parsedId: number | undefined;

        if (userId !== undefined) {
            if (typeof userId === 'string') {
                parsedId = parseInt(userId, 10);
                if (isNaN(parsedId)) {
                    throw new BadRequestException(
                        `userId must be a valid integer`,
                    );
                }
            } else if (!Number.isInteger(userId)) {
                throw new BadRequestException(`userId must be a valid integer`);
            }
        }

        return this.taskService.getUserTasks(parsedId);
    }

    @Get('/list')
    async getAllUsers(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }
}
