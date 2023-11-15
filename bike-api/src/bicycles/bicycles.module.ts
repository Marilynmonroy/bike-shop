/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BicyclesService } from './bicycles.service';
import { BicyclesController } from './bicycles.controller';
import { BicyclesRepository } from './repositories/bicycles.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BicyclesController],
  providers: [BicyclesService, PrismaService, BicyclesRepository],
})
export class BicyclesModule {}
