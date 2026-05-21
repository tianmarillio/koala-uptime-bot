import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AccountResponseDto as AccountResponseDto } from './dtos/account-response.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAccountById(
    id: string,
  ): Promise<AccountResponseDto | null> {
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
  ): Promise<AccountResponseDto | null> {
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
