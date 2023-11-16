import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          username: user.username,
        },
        {
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'users',
      });
      return data;
    } catch (error) {
      throw new UnauthorizedError(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch {
      return false;
    }
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Usuário ou senha incorretos');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Usuário ou senha incorretos');
    }

    return this.createToken(user);
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userService.create(registerAuthDto);
    return this.createToken(user);
  }
}
