import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersRepository } from './repositories/orders.repository';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      },
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrdersRepository],
})
export class OrdersModule {}
