import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

@ApiTags('user')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiBody({ type: CreateUserDto })
    async addUser(@Body() userData: CreateUserDto): Promise<void> {
        const { email } = userData;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestException(`Email ${email} is not valid`);
        }

        return this.userService.addUser(email);
    }

    @Get('/list')
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('/:email')
    async getUser(@Param('email') email: string): Promise<User> {
        const user = this.userService.getUser(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
}
