import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '@accounts/accounts.controller';
import { AccountsService } from '@accounts/accounts.service';
import { PrismaService } from '@database/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { CreateAccountDto } from '@accounts/dtos/create-account.dto';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService, PrismaService, CryptoService],
    }).compile();
  
    accountsController = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(accountsController).toBeDefined();
  });

  describe('getAllAccounts', () => {
    it('should return an array of accounts', async () => {
      const mockAccounts = [
        {
          id: 1,
          cryptoAsset: 'BTC',
          referenceCurrency: 'USD',
          balanceInCryptoAsset: 1,
          balanceInReferenceCurrency: 10,
        },
      ];

      jest.spyOn(accountsService, 'getAllAccounts').mockImplementation(async () => mockAccounts);

      const accounts = await accountsController.getAllAccounts();

      expect(accountsService.getAllAccounts).toHaveBeenCalled();
      expect(accounts).toMatchSnapshot();
    });
  });

  describe('getAccountById', () => {
    it('should return an account with the specified id', async () => {
      const mockAccount = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      jest.spyOn(accountsService, 'getAccountById').mockImplementation(async () => mockAccount);

      const account = await accountsController.getAccountById(1);

      expect(accountsService.getAccountById).toHaveBeenCalledWith(1);
      expect(account).toMatchSnapshot();
    });

    it('should return null if the account is not found', async () => {
      jest.spyOn(accountsService, 'getAccountById').mockImplementation(async () => null);

      const account = await accountsController.getAccountById(42);

      expect(accountsService.getAccountById).toHaveBeenCalledWith(42);
      expect(account).toMatchSnapshot();
    });
  });

  describe('createAccount', () => {
    it('should create and return a new account', async () => {
      const createAccountDto: CreateAccountDto = {
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
      };

      const mockAccount = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      jest.spyOn(accountsService, 'createAccount').mockImplementation(async () => mockAccount);

      const account = await accountsController.createAccount(createAccountDto);

      expect(accountsService.createAccount).toHaveBeenCalledWith(createAccountDto);
      expect(account).toMatchSnapshot();
    });
  });
});