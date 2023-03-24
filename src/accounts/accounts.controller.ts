import { 
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CryptoAccountDto } from './dtos/crypto-account.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOkResponse({ type: [CryptoAccountDto], description: 'Get all accounts' })
  @ApiOperation({ summary: 'Get all accounts' })
  async getAllAccounts(): Promise<CryptoAccountDto[]> {
    return (await this.accountsService.getAllAccounts()).map(account => {
      const dto = new CryptoAccountDto();
      Object.assign(dto, account);
      return dto;
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CryptoAccountDto, description: 'Get account by id' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiOperation({ summary: 'Get account by id' })
  async fetchAccountById(@Param('id', ParseIntPipe) id: number): Promise<CryptoAccountDto | null> {
    const account = await this.accountsService.getAccountById(id);
    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const dto = new CryptoAccountDto();
    Object.assign(dto, account);
    return dto;
  }

  @Post()
  @ApiCreatedResponse({ type: CryptoAccountDto, description: 'Create a new account' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  @ApiOperation({ summary: 'Create a new account' })
  async createAccount(@Body() dto: CryptoAccountDto): Promise<CryptoAccountDto> {
    try {
      const account = await this.accountsService.createAccount(dto);
      const responseDto = new CryptoAccountDto();
      Object.assign(responseDto, account);
      return responseDto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException('Failed to create a new account');
      }
    }
  }
}
