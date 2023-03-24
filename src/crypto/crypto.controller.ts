import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

type ExchangeRateResponse = Record<string, number>;

@ApiTags('Crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('exchange-rate')
  @ApiOkResponse({ description: 'Get exchange rate for a currency pair' })
  @ApiBadRequestResponse({ description: 'Invalid currency pair' })
  @ApiOperation({ summary: 'Get exchange rate for a currency pair' })
  @ApiQuery({ name: 'from', description: 'Source currency' })
  @ApiQuery({ name: 'to', description: 'Target currency' })
  async getCurrencyExchangeRate(@Query('from') from: string, @Query('to') to: string): Promise<ExchangeRateResponse> {
    const pair = from.toUpperCase() + to.toUpperCase();
    const rate = this.cryptoService.getExchangeRate(pair);
  
    if (!rate) {
      throw new BadRequestException(`Exchange rate not found for pair: ${pair}`);
    }
  
    return {
      [pair]: rate,
    };
  }
}
