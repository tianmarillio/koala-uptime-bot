import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return await this.authService.signin(signinDto);
  }

  @Post('signup')
  async signin(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return await this.authService.signin(signinDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: signupDto): Promise<{ accessToken: string }> {
    return await this.authService.signup(signupDto);
  }
}
