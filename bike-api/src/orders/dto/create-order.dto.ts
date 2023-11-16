import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Descrição da ordem' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Estado da ordem', default: ['incomplete'] })
  @IsEnum(['completed', 'incomplete'])
  status: Status;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({ description: 'Id da bike' })
  @IsNumber()
  bicycleId: number;

  @ApiProperty({ description: 'Valor do serviço' })
  @IsNotEmpty()
  value: number;
}
