import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomerEntity } from './entities/customer.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class CustomersService {
  constructor(private readonly repository: CustomersRepository) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.repository.create(createCustomerDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new NotFoundError('Cliente não encontrado');
    }
    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.repository.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
