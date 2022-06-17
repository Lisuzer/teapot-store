import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Status } from 'src/auth/decorators/status.decorator';
import { StatusesGuard } from 'src/auth/guards/status.guard';
import { UserStatus } from 'src/auth/schemas/user-status.enum';
import { HTTP_EXCEPTION } from 'src/interfaces/HTTP_EXCEPTION.interface';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { CreateTeapotDto } from './dto/cteate-teapot.dto';
import { UpdateTeapotDto } from './dto/update-teapot.dto';
import { TeapotsService } from './teapots.service';


@ApiTags('teapots')
@Controller('teapots')
export class TeapotsController {
    constructor(private teapotsService: TeapotsService) { }

    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiOperation({
        description: 'Getting teapot information | Required roles: Guest',
    })
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.teapotsService.getById(id);
    }

    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiOperation({
        description: 'Getting all teapots information | Required roles: Guest',
    })
    @Get()
    async getAll() {
        return this.teapotsService.getAll();
    }

    @ApiCreatedResponse({
        description: 'Entity successfully created',
        type: HTTP_RESPONSE,
    })
    @ApiNotFoundResponse({
        description: 'Entity not found',
        type: HTTP_EXCEPTION,
    })
    @ApiBadRequestResponse({
        description: 'Error while creating entity',
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
        description: 'Creating teapot | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Post()
    async create(@Body() teapotDto: CreateTeapotDto) {
        return this.teapotsService.create(teapotDto);
    }


    @ApiCreatedResponse({
        description: 'Entity successfully updated',
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
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        type: HTTP_EXCEPTION,
    })
    @ApiForbiddenResponse({
        description: 'Permission not granted',
        type: HTTP_EXCEPTION,
    })
    @ApiOperation({
        description: 'Updating teapot | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() teapotDto: UpdateTeapotDto) {
        return this.teapotsService.update(id, teapotDto);
    }


    @ApiCreatedResponse({
        description: 'Entity successfully deleted',
        type: HTTP_RESPONSE,
    })
    @ApiNotFoundResponse({
        description: 'Entity not found',
        type: HTTP_EXCEPTION,
    })
    @ApiBadRequestResponse({
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
        description: 'Deleting teapot | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.teapotsService.delete(id);
    }

}
