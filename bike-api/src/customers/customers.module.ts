import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersRepository } from './repositories/customers.repository';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService, CustomersRepository],
})
export class CustomersModule {}
