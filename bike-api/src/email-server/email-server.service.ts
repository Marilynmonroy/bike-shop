import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { BicycleEntity } from 'src/bicycles/entities/bicycle.entity';

@Injectable()
export class EmailServerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderReport(
    order: OrderEntity,
    customer: CustomerEntity,
    bicycle: BicycleEntity,
  ): Promise<void> {
    if (!order || !customer || !customer.email) {
      throw new Error('Ordem ou cliente não achados');
    }

    const mailOptions = {
      to: customer.email,
      from: 'marilyn.monroy@universo.univates.br',
      subject: `Relatório da ordem ${order.id}`,
      text: `Oi ${customer.name} Aqui estão os detalhes da sua ordem da bike ${bicycle.id} cor: ${bicycle.color} : ID: ${order.id}, Status: ${order.status}, Criada em: ${order.createdAt}, Valor: ${order.value}`,
      html: `<p>Detalhes da ordem:</p><ul><li>ID: ${order.id}</li><li>Status: ${order.status}</li><li>Criada em: ${order.createdAt}</li><li>Valor: ${order.value}</li></ul>`,
    };

    await this.mailerService.sendMail(mailOptions);
  }
}
