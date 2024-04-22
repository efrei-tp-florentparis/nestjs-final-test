import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

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
        const isUnique = await this.nameIsUnique(name);
        if (!isUnique) {
            throw new Error('Le nom de la tâche doit être unique.');
        }

        if (typeof priority === 'string') {
            // Convertit la priorité en entier
            priority = parseInt(priority, 10);
        }

        await this.prisma.getPrismaClient().task.create({
            data: {
                name: name,
                userId: userId,
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

    getUserTasks(userId: string): Promise<unknown[]> {
        throw new NotImplementedException();
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.getPrismaClient().task.findMany();
    }

    async resetData(): Promise<void> {
        await this.prisma.getPrismaClient().task.deleteMany({});
    }
}
