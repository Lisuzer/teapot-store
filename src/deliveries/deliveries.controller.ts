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
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@ApiTags("deliveries")
@Controller('deliveries')
export class DeliveriesController {
    constructor(private deliveriesService: DeliveriesService) { }

    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiOperation({
        description: 'Getting all deliveries information | Required roles: Guest',
    })
    @Get()
    async getAll() {
        return this.deliveriesService.getAll();
    }

    @ApiOkResponse({
        description: 'Entity found',
        type: HTTP_RESPONSE,
    })
    @ApiOperation({
        description: 'Getting delivery information | Required roles: Guest',
    })
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.deliveriesService.getById(id);
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
        description: 'Creating delivery | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Post()
    async create(@Body() dto: CreateDeliveryDto) {
        return this.deliveriesService.create(dto);
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
        description: 'Deleting delivery | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.deliveriesService.remove(id);
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
        description: 'Updating delivery | Required roles: Admin',
    })
    @ApiBearerAuth('JWT-auth')
    @Status(UserStatus.ADMIN)
    @UseGuards(AuthGuard('jwt'), StatusesGuard)
    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDeliveryDto) {
        return this.deliveriesService.update(id, dto);
    }
}
