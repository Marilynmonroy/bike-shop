import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailServerService } from './email-server.service';
import { CreateEmailServerDto } from './dto/create-email-server.dto';
import { UpdateEmailServerDto } from './dto/update-email-server.dto';

@Controller('email-server')
export class EmailServerController {
  constructor(private readonly emailServerService: EmailServerService) {}

  @Post()
  create(@Body() createEmailServerDto: CreateEmailServerDto) {
    return this.emailServerService.create(createEmailServerDto);
  }

  @Get()
  findAll() {
    return this.emailServerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailServerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailServerDto: UpdateEmailServerDto) {
    return this.emailServerService.update(+id, updateEmailServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailServerService.remove(+id);
  }
}
