import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
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
    const accounts = await this.accountsService.getAllAccounts();

    return this.accountsService.mapAccountsToDtos(accounts);
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

    return this.accountsService.mapAccountToDto(account);
  }

  @Post()
  @ApiCreatedResponse({ type: CryptoAccountDto, description: 'Create a new account' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  @ApiOperation({ summary: 'Create a new account' })
  async createAccount(@Body() dto: CryptoAccountDto): Promise<CryptoAccountDto> {
    try {
      const account = await this.accountsService.createAccount(dto);

      return this.accountsService.mapAccountToDto(account);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException('Failed to create a new account');
      }
    }
  }
}
