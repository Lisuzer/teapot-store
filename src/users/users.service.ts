import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository (User) private userRepository: Repository<User>){}

    async createUser(dto: CreateUserDto):Promise<User>{
        return this.userRepository.create(dto);
    }

    async getAllUsers():Promise<User[]>{
        return this.userRepository.find();
    }

    async getOneUser(id: string): Promise<User>{
        return this.userRepository.findOne({where:{id,},});
    }

    async removeUser(id: string): Promise<DeleteResult>{
        return this.userRepository.delete(id);
    }

    async updateUser(id: string, dto: UpdateUserDto):Promise<User>{
        let user = await this.userRepository.findOne(id);
        user = {...user, ...dto};
        return this.userRepository.save(user);
    }   
}
