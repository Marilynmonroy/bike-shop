import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersRepository } from './repositories/orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrdersRepository],
})
export class OrdersModule {}
