import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  Put,
  UseGuards,
  Optional,
  Query,
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
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Status } from 'src/auth/decorators/status.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StatusesGuard } from 'src/auth/guards/status.guard';
import { UserStatus } from 'src/auth/schemas/user-status.enum';
import { HTTP_EXCEPTION } from 'src/interfaces/HTTP_EXCEPTION.interface';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { StatusName } from './schemas/status-name.enum';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) { }
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
    description: 'Creating order | Required roles: User',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.CLIENT)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Post('create')
  async create(@Body() orderDto: CreateOrderDto) {
    return this.orderService.create(orderDto);
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
    description: 'Updating order | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() orderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, orderDto);
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
    description: 'Deleting order | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.delete(id);
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
    description: 'Getting all orders | Required status: **Admin**',
  })
  @ApiQuery({
    name: 'filter',
    enum: StatusName,
    required: false,
    description: 'Optional'
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Get('get-all')
  getAll(@Query('filter') filter: StatusName) {
    return this.orderService.findAll(filter);
  }

  @ApiOkResponse({
    description: 'Getting orders',
    type: HTTP_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    type: HTTP_EXCEPTION,
  })
  @ApiOperation({
    description:
      'Getting user orders entities | Required conditions: **Authorized**',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('user-orders')
  getUser(@Request() req) {
    return this.orderService.getOrder(req);
  }

  @ApiOkResponse({
    description: 'Getting orders',
    type: HTTP_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    type: HTTP_EXCEPTION,
  })
  @ApiOperation({
    description: 'Getting all orders | Required status: **Admin**',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Get(':id')
  getById(@Param() id: string) {
    return this.orderService.findById(id);
  }
}
