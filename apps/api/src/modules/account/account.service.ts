import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AccountDto as AccountDto } from './dtos/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAccountById(
    id: string,
  ): Promise<AccountDto | null> {
    const account = this.prisma.account.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!account) return null;

    return account;
  }

  async findAccountByUsername(
    username: string,
  ): Promise<AccountDto | null> {
    const account = this.prisma.account.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!account) return null;

    return account;
  }
}
