import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

const allowedCryptoAssets = ['BTC', 'ETH', 'BCH'];
const allowedReferenceCurrencies = ['USD', 'EUR', 'CAD', 'JPY', 'GBP', 'CHF', 'AUD'];

export class CryptoAccountDto implements Partial<Account> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(allowedCryptoAssets)
    cryptoAsset: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(allowedReferenceCurrencies)
    referenceCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    balanceInCryptoAsset: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    balanceInReferenceCurrency: number;
}
