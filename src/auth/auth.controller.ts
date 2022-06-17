import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    Put,
    Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HTTP_EXCEPTION } from 'src/interfaces/HTTP_EXCEPTION.interface';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { AuthService } from './auth.service';
import { Status } from './decorators/status.decorator';
import { ChangeUserStatusDto } from './dto/change-user-status.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { StatusesGuard } from './guards/status.guard';
import { UserStatus } from './schemas/user-status.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiCreatedResponse({
        description: 'Successfully created entity',
        type: HTTP_RESPONSE,
    })
    @ApiBadRequestResponse({
        description: 'Invalid payload provided',
        type: HTTP_EXCEPTION,
    })
    @ApiInternalServerErrorResponse({
        description: 'Error while creating entity',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Lets user register in system | Required roles: **Guest**',
    })
    @Post('register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.registerAccount(userDto);
    }


    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiBadRequestResponse({
        description: 'Invalid credentials',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Lets user login in system | Required status: **Guest**',
    })
    @Post('login')
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
    }


    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user',
        type: HTTP_EXCEPTION,
    })
    @ApiForbiddenResponse({
        description: 'Permission not granted',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Getting all system users | Required status: **Admin**',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Get('users')
    getAllUsers() {
        return this.authService.getAllUsers();
    }


    @ApiOkResponse({
        description: 'Entity updated successfully',
        type: HTTP_RESPONSE,
    })
    @ApiNotFoundResponse({
        description: 'Entity not found',
        type: HTTP_EXCEPTION,
    })
    @ApiBadRequestResponse({
        description: 'Invalid payload provided',
        type: HTTP_EXCEPTION,
    })
    @ApiInternalServerErrorResponse({
        description: 'Error while updating entity',
        type: HTTP_EXCEPTION,
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiForbiddenResponse({
        description: 'Permission not granted',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Changing user role | Required status: **Admin**',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Post('change-status')
    changeStatus(@Body() changeUserRoleDto: ChangeUserStatusDto) {
        return this.authService.changeUserStatus(changeUserRoleDto);
    }


    @ApiOkResponse({
        description: 'Getting user entity',
        type: HTTP_RESPONSE,
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Getting user entity | Required conditions: **Authorized**',
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @Get('user')
    getUser(@Request() req) {
        return this.authService.getUser(req);
    }


    @ApiOkResponse({
        description: 'Entity updated successfully',
        type: HTTP_RESPONSE,
    })
    @ApiBadRequestResponse({
        description: 'Invalid payload provided',
        type: HTTP_EXCEPTION,
    })
    @ApiInternalServerErrorResponse({
        description: 'Error while updating entity',
        type: HTTP_EXCEPTION,
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Updating user | Required conditions: **Authorized**',
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Put('user')
    updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.updateProfile(req, updateUserDto);
    }



    @Post('create-admin')
    createAdmin(@Body() userDto: CreateUserDto) {
        return this.authService.createAdmin(userDto)
    }



    @ApiOkResponse({
        description: 'Entity deleted successfully',
        type: HTTP_RESPONSE,
    })
    @ApiBadRequestResponse({
        description: 'Invalid payload provided',
        type: HTTP_EXCEPTION,
    })
    @ApiInternalServerErrorResponse({
        description: 'Error while deleting entity',
        type: HTTP_EXCEPTION,
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Deleting user | Required conditions: **Authorized**',
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Delete('user')
    removeUser(@Request() req) {
        return this.authService.removeUser(req);
    }


    @ApiOkResponse({
        description: 'Entity deleted successfully',
        type: HTTP_RESPONSE,
    })
    @ApiNotFoundResponse({
        description: 'Entity not found',
        type: HTTP_EXCEPTION,
    })
    @ApiBadRequestResponse({
        description: 'Invalid payload provided',
        type: HTTP_EXCEPTION,
    })
    @ApiInternalServerErrorResponse({
        description: 'Error while deleting entity',
        type: HTTP_EXCEPTION,
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiForbiddenResponse({
        description: 'Permission not granted',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Deleting user by id | Required status: **Admin**',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Delete('user-by-id')
    removeUserById(@Body() id: string) {
        return this.authService.removeUserById(id);
    }
}

