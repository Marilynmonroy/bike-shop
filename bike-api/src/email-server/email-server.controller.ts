import { Controller, Post, Body } from '@nestjs/common';
import { EmailServerService } from './email-server.service';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { BicycleEntity } from 'src/bicycles/entities/bicycle.entity';

@Controller('email-server')
export class EmailServerController {
  constructor(private readonly emailServerService: EmailServerService) {}

  @Post()
  async sendOrderReport(
    @Body()
    data: {
      order: OrderEntity;
      customer: CustomerEntity;
      bicycle: BicycleEntity;
    },
  ): Promise<void> {
    const { order, customer, bicycle } = data;

    if (!order || !customer || !customer.email) {
      throw new Error(
        'Datos de la orden o cliente incorrectos para enviar el informe',
      );
    }

    await this.emailServerService.sendOrderReport(order, customer, bicycle);
  }
}
