import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAccountInput } from 'src/modules/auth/interfaces/jwt-account.interface';
import bcrypt from 'bcryptjs';
import { SignUpDto } from './dtos/sign-up.dto';
import { AccountSignUpUseCase } from 'src/application/identity/account-sign-up.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly accountSignUpUseCase: AccountSignUpUseCase,
  ) {}

  async signIn(signinDto: SignInDto): Promise<{ accessToken: string }> {
    const normalizedUsername = signinDto.username.toLowerCase();
    
    const account =
      await this.accountService.findAccountByUsername(normalizedUsername);

    if (!account) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const isMatched = await bcrypt.compare(
      signinDto.password,
      account.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Unauthorized access');
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

  async signUp(signupDto: SignUpDto): Promise<void> {
    const { username, password } = signupDto;

    const user = await this.accountService.findAccountByUsername(username);

    if (user) {
      throw new BadRequestException('Username already used');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.accountSignUpUseCase.createNewUserData({
      username,
      password: hashedPassword,
    });
  }
}
