import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/domains/account/account.service';
import { SigninDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAccountInput } from 'src/shared/interfaces/jwt-account.interface';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
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
}
