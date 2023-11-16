import { ApiProperty } from '@nestjs/swagger';
import { Bicycle, Customer, Order } from '@prisma/client';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({ description: 'Id da order' })
  @IsNumber()
  orderId: Order;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  customerEmail: Customer;

  @ApiProperty({ description: 'Id da bike' })
  @IsNumber()
  bicycleId: Bicycle;
}
