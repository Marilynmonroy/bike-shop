import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBicycleDto {
  @ApiProperty({ description: 'Modelo da bike' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Cor da bike' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ description: 'Características da bike' })
  @IsString()
  @IsNotEmpty()
  characteristics: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  customerEmail: string;
}
