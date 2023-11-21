import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { EmailOrderDto } from './dto/email-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('email')
  async email(@Body() { id, customerEmail }: EmailOrderDto) {
    return this.ordersService.sendEmail(id, customerEmail);
  }
}
