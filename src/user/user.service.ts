import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async addUser(email: string): Promise<void> {
        await this.prisma.getPrismaClient().user.create({
            data: {
                email: email,
            },
        });
    }

    async getUser(email: string): Promise<User> {
        const user = await this.prisma.getPrismaClient().user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    async isEmailUnique(email: string): Promise<boolean> {
        const user = await this.prisma.getPrismaClient().user.findUnique({
            where: {
                email,
            },
        });
        return !user;
    }

    async getUserById(userId: number): Promise<boolean> {
        const user = await this.prisma.getPrismaClient().user.findUnique({
            where: {
                id: userId,
            },
        });
        return !user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.getPrismaClient().user.findMany();
    }

    async resetData(): Promise<void> {
        await this.prisma.getPrismaClient().user.deleteMany({});
    }
}
