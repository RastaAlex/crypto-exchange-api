import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '@accounts/accounts.service';
import { PrismaService } from '@database/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { CreateAccountDto } from '@accounts/dtos/create-account.dto';
import { Account } from '@prisma/client';
import { CronJob } from 'cron';

jest.useFakeTimers();

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let prismaService: PrismaService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AccountsService,
        CryptoService,
        PrismaService,
      ],
    }).compile();
  
    accountsService = moduleRef.get<AccountsService>(AccountsService);
    cryptoService = moduleRef.get<CryptoService>(CryptoService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    await prismaService.account.deleteMany();
  });
  afterEach(async () => {
    await prismaService.account.deleteMany();
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
      const createAccountDto: CreateAccountDto = {
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
      };

      const account = await accountsService.createAccount(createAccountDto);
      expect(account).toBeDefined();
      expect(account).toMatchSnapshot();
    });
  });

  describe('getAllAccounts', () => {
    it('should return all accounts', async () => {
      const createAccountDto: CreateAccountDto = {
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
      };

      await accountsService.createAccount(createAccountDto);
      const accounts = await accountsService.getAllAccounts();
      expect(accounts).toBeDefined();
      expect(accounts).toMatchSnapshot();
    });
  });
})