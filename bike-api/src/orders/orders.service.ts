import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderEntity } from './entities/order.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: OrdersRepository) {}

  create(createOrderDto: CreateOrderDto) {
    return this.repository.create(createOrderDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.repository.findOne(id);
    if (!order) {
      throw new NotFoundError('Ordem não encontrada');
    }
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.repository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }

  sendEmail(id: number, customerEmail: string) {
    return this.repository.sendEmail(id, customerEmail);
  }
}
