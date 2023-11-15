import { Module } from '@nestjs/common';
import { EmailServerService } from './email-server.service';
import { EmailServerController } from './email-server.controller';

@Module({
  controllers: [EmailServerController],
  providers: [EmailServerService],
})
export class EmailServerModule {}
