import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.prisma.customer.findMany({
      include: {
        orders: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            value: true,
          },
        },
        bicycles: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        bicycles: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.prisma.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
      include: {
        bicycles: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    });
  }

  remove(id: number): Promise<CustomerEntity> {
    return this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
