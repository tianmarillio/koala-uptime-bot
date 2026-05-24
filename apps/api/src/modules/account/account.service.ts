import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AccountDto as AccountDto } from './dtos/account.dto';
import { Prisma } from 'src/generated/prisma/client';
import { CreateAccountDto } from './dtos/create-account.dto';
import { generateNanoid } from 'src/utils/nanoid';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: DatabaseService) {}

  // Properties

  private findAccountSelect: Prisma.AccountSelect = {
    id: true,
    username: true,
    password: true,
  };

  private findAccountCommonQuery: Prisma.AccountFindFirstArgs = {
    select: this.findAccountSelect,
  };

  // Methods
  async findAccountById(id: string): Promise<AccountDto | null> {
    const account = this.prisma.account.findFirst({
      ...this.findAccountCommonQuery,
      where: {
        id,
      },
    });

    if (!account) return null;

    return account;
  }

  async findAccountByUsername(username: string): Promise<AccountDto | null> {
    const account = this.prisma.account.findFirst({
      ...this.findAccountCommonQuery,
      where: {
        username,
      },
    });

    if (!account) return null;

    return account;
  }

  async createAccount(
    createPasswordDto: CreateAccountDto,
  ): Promise<{ id: string }> {
    const id = generateNanoid();

    const createdAccount = await this.prisma.account.create({
      data: {
        ...createPasswordDto,
        id,
      },
    });

    return { id: createdAccount.id };
  }
}
