import { Injectable } from '@nestjs/common';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { BicyclesRepository } from './repositories/bicycles.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { BicycleEntity } from './entities/bicycle.entity';
@Injectable()
export class BicyclesService {
  constructor(private readonly repository: BicyclesRepository) {}
  create(createBicycleDto: CreateBicycleDto) {
    return this.repository.create(createBicycleDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<BicycleEntity> {
    const bicycle = await this.repository.findOne(id);
    if (!bicycle) {
      throw new NotFoundError('Bike não encontrada');
    }
    return bicycle;
  }

  update(id: number, updateBicycleDto: UpdateBicycleDto) {
    return this.repository.update(id, updateBicycleDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
