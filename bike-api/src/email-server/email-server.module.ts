import { Module } from '@nestjs/common';
import { EmailServerService } from './email-server.service';
import { EmailServerController } from './email-server.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp@gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'marilyn.monroy@universo.univates.br',
          pass: 'vfqd vexy duzo esfp',
        },
      },
    }),
  ],
  controllers: [EmailServerController],
  providers: [EmailServerService],
})
export class EmailServerModule {}
