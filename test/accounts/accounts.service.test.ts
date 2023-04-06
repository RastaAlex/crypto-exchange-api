import { Test } from '@nestjs/testing';
import { AccountsService } from '@accounts/accounts.service';
import { PrismaService } from '@database/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { CryptoAccountDto } from '@accounts/dtos/crypto-account.dto';
import { Account } from '@prisma/client';

jest.useFakeTimers();

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AccountsService,
        CryptoService,
        PrismaService,
      ],
    }).compile();

    accountsService = moduleRef.get<AccountsService>(AccountsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    await prismaService.account.deleteMany();
  });
  afterEach(async () => {
    await prismaService.account.deleteMany();
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
      const CryptoAccountDto: CryptoAccountDto = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      const account = await accountsService.createAccount(CryptoAccountDto);
      expect(account).toBeDefined();
      expect(account).toMatchSnapshot();
    });
  });

  describe('getAllAccounts', () => {
    it('should return all accounts', async () => {
      const CryptoAccountDto: CryptoAccountDto = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      await accountsService.createAccount(CryptoAccountDto);
      const accounts = await accountsService.getAllAccounts();
      expect(accounts).toBeDefined();
      expect(accounts).toMatchSnapshot();
    });
  });

  describe('mapAccountToDto', () => {
    it('should map an account to a CryptoAccountDto', async () => {
      const account: Account = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      const dto = await accountsService.mapAccountToDto(account);
      expect(dto).toBeDefined();
      expect(dto).toMatchSnapshot();
    });
  });

  describe('mapAccountsToDtos', () => {
    it('should map an array of accounts to an array of CryptoAccountDtos', async () => {
      const accounts: Account[] = [
        {
          id: 1,
          cryptoAsset: 'BTC',
          referenceCurrency: 'USD',
          balanceInCryptoAsset: 1,
          balanceInReferenceCurrency: 10,
        },
        {
          id: 2,
          cryptoAsset: 'ETH',
          referenceCurrency: 'USD',
          balanceInCryptoAsset: 2,
          balanceInReferenceCurrency: 20,
        },
      ];

      const dtos = await accountsService.mapAccountsToDtos(accounts);
      expect(dtos).toBeDefined();
      expect(dtos).toHaveLength(2);
      expect(dtos).toMatchSnapshot();
    });
  });

});
