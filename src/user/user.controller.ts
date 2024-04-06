import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body() userData: { email: string }): Promise<void> {
        const { email } = userData;

        return this.userService.addUser(email);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
