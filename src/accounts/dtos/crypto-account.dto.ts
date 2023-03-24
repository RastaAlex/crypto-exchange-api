import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CryptoAccountDto implements Partial<Account> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cryptoAsset: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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