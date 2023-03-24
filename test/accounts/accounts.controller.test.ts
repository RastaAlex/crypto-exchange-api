import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpException } from '@nestjs/common';
import { AccountsController } from '@accounts/accounts.controller';
import { AccountsService } from '@accounts/accounts.service';
import { PrismaService } from '@database/prisma.service';
import { CryptoService } from '@crypto/crypto.service';
import { CryptoAccountDto } from '@accounts/dtos/crypto-account.dto';

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

  describe('fetchAccountById', () => {
    it('should return an account with the specified id', async () => {
      const mockAccount = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      jest.spyOn(accountsService, 'getAccountById').mockImplementation(async () => mockAccount);

      const account = await accountsController.fetchAccountById(1);

      expect(accountsService.getAccountById).toHaveBeenCalledWith(1);
      expect(account).toMatchSnapshot();
    });

    it('should throw BadRequestException if the account is not found', async () => {
      jest.spyOn(accountsService, 'getAccountById').mockImplementation(async () => null);
  
      await expect(accountsController.fetchAccountById(42)).rejects.toThrow(BadRequestException);
  
      expect(accountsService.getAccountById).toHaveBeenCalledWith(42);
    });
  });

  describe('createAccount', () => {
    it('should create and return a new account', async () => {
      const CryptoAccountDto: CryptoAccountDto = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 1,
      };

      const mockAccount = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 10,
      };

      jest.spyOn(accountsService, 'createAccount').mockImplementation(async () => mockAccount);

      const account = await accountsController.createAccount(CryptoAccountDto);

      expect(accountsService.createAccount).toHaveBeenCalledWith(CryptoAccountDto);
      expect(account).toMatchSnapshot();
    });
    it('should throw the HttpException if createAccount throws an HttpException', async () => {
      const cryptoAccountDto: CryptoAccountDto = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 1,
      };
  
      const testError = new HttpException('Test error', 500);
      jest.spyOn(accountsService, 'createAccount').mockImplementation(async () => {
        throw testError;
      });
  
      await expect(accountsController.createAccount(cryptoAccountDto)).rejects.toThrow(testError);
  
      expect(accountsService.createAccount).toHaveBeenCalledWith(cryptoAccountDto);
    });
  
    it('should throw a BadRequestException if createAccount throws a non-HttpException', async () => {
      const cryptoAccountDto: CryptoAccountDto = {
        id: 1,
        cryptoAsset: 'BTC',
        referenceCurrency: 'USD',
        balanceInCryptoAsset: 1,
        balanceInReferenceCurrency: 1,
      };
  
      jest.spyOn(accountsService, 'createAccount').mockImplementation(async () => {
        throw new Error('Non-HttpException');
      });
  
      await expect(accountsController.createAccount(cryptoAccountDto)).rejects.toThrow(BadRequestException);
  
      expect(accountsService.createAccount).toHaveBeenCalledWith(cryptoAccountDto);
    });
  });
});