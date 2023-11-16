import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BicycleEntity } from '../entities/bicycle.entity';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class BicyclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBicycleDto: CreateBicycleDto): Promise<BicycleEntity> {
    const { customerEmail } = createBicycleDto;
    const customer = await this.prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });

    if (!customer) {
      throw new NotFoundError('Cliente no encontrado');
    }

    const data: Prisma.BicycleCreateInput = {
      ...createBicycleDto,
      customer: {
        connect: {
          email: customerEmail,
        },
      },
    };

    return this.prisma.bicycle.create({
      data,
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

  async findAll(): Promise<BicycleEntity[]> {
    return this.prisma.bicycle.findMany({
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        orders: {
          select: {
            id: true,
            status: true,
            description: true,
            value: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<BicycleEntity> {
    return this.prisma.bicycle.findUnique({
      where: {
        id,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateBicycleDto: UpdateBicycleDto,
  ): Promise<BicycleEntity> {
    const { customerEmail } = updateBicycleDto;

    if (!customerEmail) {
      return this.prisma.bicycle.update({
        data: updateBicycleDto,
        where: { id },
      });
    }

    delete updateBicycleDto.customerEmail;

    const customer = await this.prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });

    if (!customer) {
      throw new NotFoundError('Bike no encontrado');
    }

    const data: Prisma.BicycleUpdateInput = {
      ...updateBicycleDto,
      customer: {
        connect: {
          email: customerEmail,
        },
      },
    };
    return this.prisma.bicycle.update({
      where: { id },
      data,
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  remove(id: number): Promise<BicycleEntity> {
    return this.prisma.bicycle.delete({
      where: {
        id,
      },
    });
  }
}
