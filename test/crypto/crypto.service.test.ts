import { Test, TestingModule } from '@nestjs/testing';
import WebSocket from 'ws';
import { CryptoService } from '@crypto/crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('getExchangeRate', () => {
    it('should return the exchange rate for a given pair', () => {
      (cryptoService as any).exchangeRates = {
        'BTCUSD': 1.1,
        'ETHUSD': 2.2,
      };

      const btcUsdRate = cryptoService.getExchangeRate('BTCUSD');
      const ethUsdRate = cryptoService.getExchangeRate('ETHUSD');

      expect(btcUsdRate).toEqual(1.1);
      expect(ethUsdRate).toEqual(2.2);
    });
  });
});