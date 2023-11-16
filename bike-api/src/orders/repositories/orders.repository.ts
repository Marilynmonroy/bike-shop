import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const { customerEmail, bicycleId } = createOrderDto;
    delete createOrderDto.customerEmail;
    delete createOrderDto.bicycleId;
    const customer = await this.prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });
    const bicycle = await this.prisma.bicycle.findUnique({
      where: {
        id: bicycleId,
      },
    });

    if (!customer || !bicycle) {
      throw new NotFoundError('Cliente o bike no encontrados');
    }

    const data: Prisma.OrderCreateInput = {
      ...createOrderDto,
      customer: {
        connect: {
          email: customerEmail,
        },
      },
      bicycle: {
        connect: {
          id: bicycleId,
        },
      },
    };

    return this.prisma.order.create({
      data,
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        bicycle: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        bicycle: true,
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const { customerEmail, bicycleId } = updateOrderDto;

    if (!customerEmail || !bicycleId) {
      return this.prisma.order.update({
        data: updateOrderDto,
        where: { id },
      });
    }
    delete updateOrderDto.customerEmail;
    delete updateOrderDto.bicycleId;
    const customer = await this.prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });
    const bicycle = await this.prisma.bicycle.findUnique({
      where: {
        id: bicycleId,
      },
    });

    if (!customer || !bicycle) {
      throw new NotFoundError('Cliente ou bike no encontrados');
    }

    const data: Prisma.OrderUpdateInput = {
      ...updateOrderDto,
      customer: {
        connect: {
          email: customerEmail,
        },
      },
      bicycle: {
        connect: {
          id: bicycleId,
        },
      },
    };

    return this.prisma.order.update({
      where: { id },
      data,
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        bicycle: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    });
  }

  remove(id: number): Promise<OrderEntity> {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
