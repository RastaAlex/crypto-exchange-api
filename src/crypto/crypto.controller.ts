import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('exchange-rate')
  getExchangeRate(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Record<string, number> {
    const pair = from.toUpperCase() + to.toUpperCase();
    const rate = this.cryptoService.getExchangeRate(pair);

    if (!rate) {
      throw new Error(`Exchange rate not found for pair: ${pair}`);
    }

    return {
      [pair]: rate,
    };
  }
}
