import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/schemas/users.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserStatusDto } from './dto/change-user-status.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './schemas/user-status.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async registerAccount(user: CreateUserDto): Promise<HTTP_RESPONSE> {
    const { email, password, mobPhone, name, surname } = user;
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRep.save({
      name,
      surname,
      email,
      mobPhone,
      password: hashedPassword,
    });
    return {
      data: newUser,
      success: true,
      message: 'Registered successfully',
    };
  }

  async validateUser(loginUser: LoginUserDto): Promise<HTTP_RESPONSE> {
    const { password, email } = loginUser;
    try {
      const foundUser = await this.userRep.findOne(
        { email },
        {
          select: [
            'id',
            'name',
            'surname',
            'email',
            'mobPhone',
            'password',
            'birthDate',
            'status',
          ],
        },
      );
      if (foundUser) {
        const validPassword = await bcrypt.compare(
          password,
          foundUser.password,
        );
        if (validPassword) {
          delete foundUser.password;
          return {
            data: foundUser,
            success: true,
            message: 'Authorized Successfully',
          };
        }
        return { data: null, success: false, message: 'Password is not valid' };
      }
      return { data: null, success: false, message: 'User is not found' };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: 'Some error have occurred',
      };
    }
  }

  async login(loginUser: LoginUserDto): Promise<HTTP_RESPONSE> {
    const results = await this.validateUser(loginUser);
    const { data: user, message } = results;

    if (user) {
      const token = await this.jwtService.signAsync({ user });
      return { data: { token }, message, success: true };
    }
    return {
      data: null,
      success: false,
      message,
    };
  }

  async updateProfile(
    { user }: any,
    updateUserDto: UpdateUserDto,
  ): Promise<HTTP_RESPONSE> {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await this.hashPassword(password);
    }
    try {
      await this.userRep.update(user.id, updateUserDto);
      const updatedUser = await this.userRep.findOne(user.id);
      return { data: updatedUser, message: 'Update user', success: true };
    } catch (e) {
      return {
        data: null,
        message: 'Male or phone number exist',
        success: false,
      };
    }
  }

  async changeUserStatus(
    changeUserRoleDto: ChangeUserStatusDto,
  ): Promise<HTTP_RESPONSE> {
    const { id, status } = changeUserRoleDto;

    const user = await this.userRep.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.status = status;
    await this.userRep.update(user.id, user);
    const updated = await this.userRep.findOne(id);
    return {
      data: updated,
      message: 'User updated successfully',
      success: true,
    };
  }

  async getAllUsers(): Promise<HTTP_RESPONSE> {
    try {
      const results = await this.userRep.find();
      return {
        data: results,
        message: 'All users',
        success: true,
      };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: e,
      };
    }
  }

  async getUser({ user }: any): Promise<HTTP_RESPONSE> {
    try {
      const result = await this.userRep.findOne({
        where: { id: user.id },
      });
      return {
        data: result,
        message: 'Authorized',
        success: true,
      };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: e,
      };
    }
  }

  async createAdmin(user: CreateUserDto): Promise<HTTP_RESPONSE> {
    const { email, password, mobPhone, name, surname } = user;
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRep.save({
      name,
      surname,
      email,
      mobPhone,
      password: hashedPassword,
      status: UserStatus.ADMIN,
    });
    return {
      data: newUser,
      success: true,
      message: 'Registered successfully',
    };
  }

  async removeUser({ user }: any): Promise<HTTP_RESPONSE> {
    try {
      const userToDelete = user;
      this.userRep.delete(user.id);
      return {
        data: userToDelete,
        success: true,
        message: 'Deleted user',
      };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: e,
      };
    }
  }

  async removeUserById(id: string): Promise<HTTP_RESPONSE> {
    try {
      const user = await this.userRep.findOne(id);
      if (!user) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      await this.userRep.delete({ id: user.id });
      return {
        data: user,
        success: true,
        message: 'User by id ' + user.id,
      };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: e,
      };
    }
  }

  //async logout(res: Response) {
  //  res.clearCookie('jwt');
  //  return {
  //    data: null,
  //    message: 'cookie was deleted',
  //    succes: true,
  //  };
  //}
}
