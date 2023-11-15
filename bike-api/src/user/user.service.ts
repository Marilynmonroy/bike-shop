import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Cliente não encontrado');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
