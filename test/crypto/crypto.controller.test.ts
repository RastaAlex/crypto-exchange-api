import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from '@crypto/crypto.controller';
import { CryptoService } from '@crypto/crypto.service';

describe('CryptoController', () => {
  let cryptoController: CryptoController;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    cryptoController = module.get<CryptoController>(CryptoController);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('getExchangeRate', () => {
    it('should return exchange rate for the given pair', () => {
      const mockPair = 'BTCUSD';
      const mockRate = 1.1;

      jest.spyOn(cryptoService, 'getExchangeRate').mockImplementation(() => mockRate);

      const result = cryptoController.getExchangeRate('btc', 'usd');

      expect(cryptoService.getExchangeRate).toHaveBeenCalledWith(mockPair);
      expect(result).toEqual({[mockPair]: mockRate});
    });
  });
});