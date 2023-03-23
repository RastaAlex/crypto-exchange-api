import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from '@prisma/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { Account } from '@prisma/client';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountsService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async onModuleInit() {
    cron.schedule('0 0 * * *', () => this.updateAccountBalances());
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { cryptoAsset, referenceCurrency, balanceInCryptoAsset } = createAccountDto;

    return await this.prismaService.account.create({
      data: {
        cryptoAsset,
        referenceCurrency,
        balanceInCryptoAsset,
        balanceInReferenceCurrency: 0,
      },
    });
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.prismaService.account.findMany();
  }

  async getAccountById(id: number): Promise<Account | null> {
    return await this.prismaService.account.findUnique({
      where: { id: Number(id) },
    });
  }

  private async updateAccountBalances() {
    const accounts = await this.getAllAccounts();

    for (const account of accounts) {
      const pair = account.cryptoAsset + account.referenceCurrency;
      const rate = this.cryptoService.getExchangeRate(pair);

      if (rate) {
        const updatedBalance = account.balanceInCryptoAsset * rate;

        await this.prismaService.account.update({
          where: { id: account.id },
          data: { balanceInReferenceCurrency: updatedBalance },
        });
      }
    }
  }
}
