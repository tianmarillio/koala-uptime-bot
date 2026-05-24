import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAccountInput } from 'src/shared/interfaces/jwt-account.interface';
import bcrypt from 'bcryptjs';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SignInDto): Promise<{ accessToken: string }> {
    const normalizedUsername = signinDto.username.toLowerCase();

    const account =
      await this.accountService.findAccountByUsername(normalizedUsername);

    if (!account) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isMatched = await bcrypt.compare(
      signinDto.password,
      account.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Unauthorized');
    }

    const payload: JwtAccountInput = {
      id: account.id,
      username: account.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async signUp(signupDto: SignUpDto): Promise<void> {}
}
