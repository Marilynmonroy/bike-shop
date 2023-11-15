import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
