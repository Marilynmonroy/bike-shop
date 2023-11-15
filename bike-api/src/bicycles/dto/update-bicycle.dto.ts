import { PartialType } from '@nestjs/swagger';
import { CreateBicycleDto } from './create-bicycle.dto';

export class UpdateBicycleDto extends PartialType(CreateBicycleDto) {}
