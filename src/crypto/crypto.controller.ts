import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
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
  @ApiOkResponse({ description: 'Get exchange rate for the specified crypto/fiat currency pair.' })
  @ApiBadRequestResponse({ description: 'Invalid crypto/fiat currency pair' })
  @ApiOperation({ summary: 'Get exchange rate for a crypto/fiat currency pair' })
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
