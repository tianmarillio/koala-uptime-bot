import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';

@Injectable()
export class AccountSignUpUseCase {
  constructor(private readonly accountService: AccountService) {}

  async createNewUserData(dto: {
    username: string;
    password: string;
  }): Promise<void> {
    await this.accountService.createAccount(dto);
  }
}
