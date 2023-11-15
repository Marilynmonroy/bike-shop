import { Injectable } from '@nestjs/common';
import { CreateEmailServerDto } from './dto/create-email-server.dto';
import { UpdateEmailServerDto } from './dto/update-email-server.dto';

@Injectable()
export class EmailServerService {
  create(createEmailServerDto: CreateEmailServerDto) {
    return 'This action adds a new emailServer';
  }

  findAll() {
    return `This action returns all emailServer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailServer`;
  }

  update(id: number, updateEmailServerDto: UpdateEmailServerDto) {
    return `This action updates a #${id} emailServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailServer`;
  }
}
