import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
