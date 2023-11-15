import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });
  }

  remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
