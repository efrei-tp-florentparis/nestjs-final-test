import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    async nameIsUnique(name: string): Promise<boolean> {
        const existingTask = await this.prisma
            .getPrismaClient()
            .task.findMany({ where: { name: name } });
        return !existingTask[0];
    }

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<void> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new BadRequestException(
                `User with id ${userId} doesn't exist`,
            );
        }

        await this.prisma.getPrismaClient().task.create({
            data: {
                name: name,
                userId: user.id,
                priority: priority,
            },
        });
    }

    async getTaskByName(name: string): Promise<Task> {
        const task = await this.prisma.getPrismaClient().task.findUnique({
            where: {
                name: name,
            },
        });
        return task;
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new BadRequestException(
                `User with id ${userId} doesn't exist`,
            );
        }

        return await this.prisma.getPrismaClient().task.findMany({
            where: {
                userId: userId,
            },
        });
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.getPrismaClient().task.findMany();
    }

    async resetData(): Promise<void> {
        await this.prisma.getPrismaClient().task.deleteMany({});
    }
}
