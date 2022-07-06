import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturersDto } from './dto/update-manufacturer.dto';
import { ManufacturerService } from './manufacturers.service';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturersService: ManufacturerService) {}

  @ApiOkResponse({
    description: 'Entity found',
    type: HTTP_RESPONSE,
  })
  @ApiOperation({
    description:
      'Getting all manufacturers information | Required roles: Guest',
  })
  @Get()
  async getAll() {
    return this.manufacturersService.getAll();
  }

  @ApiOkResponse({
    description: 'Entity found',
    type: HTTP_RESPONSE,
  })
  @ApiOperation({
    description: 'Getting manufacturer information | Required roles: Guest',
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.manufacturersService.getById(id);
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
    description: 'Creating manufacturer | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Post('create')
  async create(@Body() dto: CreateManufacturerDto) {
    return this.manufacturersService.create(dto);
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
    description: 'Deleting manufacturer | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.manufacturersService.delete(id);
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
    description: 'Updating manufacturer | Required roles: Admin',
  })
  @ApiBearerAuth('JWT-auth')
  @Status(UserStatus.ADMIN)
  @UseGuards(AuthGuard('jwt'), StatusesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateManufacturersDto,
  ) {
    return this.manufacturersService.update(id, dto);
  }
}
