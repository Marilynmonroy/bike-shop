import { PartialType } from '@nestjs/swagger';
import { CreateEmailServerDto } from './create-email-server.dto';

export class UpdateEmailServerDto extends PartialType(CreateEmailServerDto) {}
