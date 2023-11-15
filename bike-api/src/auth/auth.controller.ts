import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/auth-register.dto';
import { User } from './decorators/auth.decotors';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: LoginAuthDto) {
    return this.authService.login(username, password);
  }

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { user };
  }
}
