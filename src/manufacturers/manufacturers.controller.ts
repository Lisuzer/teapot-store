import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("manufacturers")
@Controller('manufacturers')
export class ManufacturerController {}
