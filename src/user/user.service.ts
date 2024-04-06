import { Injectable, NotImplementedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

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

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.getPrismaClient().user.findMany();
    }
}
