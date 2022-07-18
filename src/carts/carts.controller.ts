import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Status } from 'src/auth/decorators/status.decorator';
import { StatusesGuard } from 'src/auth/guards/status.guard';
import { UserStatus } from 'src/auth/schemas/user-status.enum';
import { HTTP_EXCEPTION } from 'src/interfaces/HTTP_EXCEPTION.interface';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { CartService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  private cartService: CartService;

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
    description: 'Getting cart by order id | Required status: **Admin**',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Get(':id')
  getByOrderId(@Param() orderId: string) {
    return this.cartService.findByorderId(orderId);
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
    description: 'Updating cart | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Put(':id')
  update(
    @Param('id') orderId: string,
    @Param('id') teapotId: string,
    @Body() dto: UpdateCartDto,
  ) {
    return this.cartService.update(orderId, teapotId, dto);
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
    description: 'Deleting one purchase in cart | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Delete(':id')
  delete(@Param('id') orderId: string, @Param('id') teapotId: string) {
    return this.cartService.deleteCart(orderId, teapotId);
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
    description: 'Deleting cart | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Delete(':id')
  remove(@Param('id') orderId: string) {
    return this.cartService.remove(orderId);
  }
}
