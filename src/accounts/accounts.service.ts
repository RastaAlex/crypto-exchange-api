import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from '@database/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { Account } from '@prisma/client';
import { CryptoAccountDto } from './dtos/crypto-account.dto';

@Injectable()
export class AccountsService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async onModuleInit() {
    cron.schedule('0 0 * * *', () => this.updateAccountBalances());
  }

  /**
   * Creates a new account with the given data.
   * @param {CryptoAccountDto} CryptoAccountDto
   * @returns {Promise<Account>}
   */
  async createAccount(CryptoAccountDto: CryptoAccountDto): Promise<Account> {
    const { cryptoAsset, referenceCurrency, balanceInCryptoAsset } = CryptoAccountDto;

    return await this.prismaService.account.create({
      data: {
        cryptoAsset,
        referenceCurrency,
        balanceInCryptoAsset,
        balanceInReferenceCurrency: 0,
      },
    });
  }

  /**
   * Returns an array of all accounts in the database.
   * @returns {Promise<Account[]>}
   */
  async getAllAccounts(): Promise<Account[]> {
    return await this.prismaService.account.findMany();
  }

  /**
   * Returns the account with the given ID
   * @param {number} id
   * @returns {Promise<Account | null>}
   */
  async getAccountById(id: number): Promise<Account | null> {
    const account = await this.prismaService.account.findUnique({
      where: { id },
    });

    return account;
  }

  /**
   * Updates the balances of all accounts in the database based on the current exchange rates.
   * @returns {Promise<void>}
   */
  public async updateAccountBalances() {
    const accounts = await this.getAllAccounts();

    for (const account of accounts) {
      const pair = account.cryptoAsset + account.referenceCurrency;
      const rate = await this.cryptoService.getExchangeRate(pair);

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
