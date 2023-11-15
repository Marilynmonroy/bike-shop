import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BicyclesService } from './bicycles.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bicycles')
@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) {}

  @ApiResponse({ status: 405, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicyclesService.create(createBicycleDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.bicyclesService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicyclesService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    return this.bicyclesService.update(+id, updateBicycleDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicyclesService.remove(+id);
  }
}
