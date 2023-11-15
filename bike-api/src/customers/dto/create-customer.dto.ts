import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nome do cliente' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email do cliente' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Número do cliente' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
