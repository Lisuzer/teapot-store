import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    create(@Body() userDto: CreateUserDto): Promise<User>{
        return this.usersService.createUser(userDto);        
    }

    @Get()
    getAll(): Promise<User[]>{
        return this.usersService.getAllUsers();
    }

    @Get('id:')
    getOne(@Param('id') id: string): Promise<User>{
        return this.usersService.getOneUser(id);
    }

    @Delete("id:")
    remove(@Param('id') id: string):Promise<DeleteResult>{
        return this.usersService.removeUser(id);
    }

    @Put('id:')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto):Promise<User>{
        return this.usersService.updateUser(id, dto);
    }
}
