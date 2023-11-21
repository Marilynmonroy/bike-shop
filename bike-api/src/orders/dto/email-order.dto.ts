import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EmailOrderDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  customerEmail: string;
}
