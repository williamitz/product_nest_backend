import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto, LoginGoogle } from './dto/login-user.dto';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() body: RegisterUserDto) {
    return this.authService.create(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('login/google')
  loginWithGoogle( @Body() body: LoginGoogle ) {
    return this.authService.loginWithGoogle( body );
  }

  @Post('singin/google')
  singinWithGoogle( @Body() body: LoginGoogle ) {
    return this.authService.singinWithGoogle( body );
  }

  @Get()
  @Auth()
  testPassport() {
    return {
      ok: true,
      message: 'Passport valid :D'
    }
  }
}
