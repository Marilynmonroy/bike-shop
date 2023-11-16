import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Injectable()
export class EmailServerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderReport(
    order: OrderEntity,
    customer: CustomerEntity,
  ): Promise<void> {
    if (!order || !customer || !customer.email) {
      throw new Error('Orden o cliente no encontrados para enviar el informe');
    }

    const mailOptions = {
      to: customer.email,
      from: 'marilyn.monroy@universo.univates.br',
      subject: `Relatório da ordem ${order.id}`,
      text: `Detalhes da ordem: ID: ${order.id}, Status: ${order.status}, Criada em: ${order.createdAt}, Valor: ${order.value}`,
      html: `<p>Detalhes da ordem:</p><ul><li>ID: ${order.id}</li><li>Status: ${order.status}</li><li>Criada em: ${order.createdAt}</li><li>Valor: ${order.value}</li></ul>`,
    };

    await this.mailerService.sendMail(mailOptions);
  }
}
