import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from '@prisma/client';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return await this.accountsService.getAllAccounts();
  }

  @Get(':id')
  async getAccountById(@Param('id') id: number): Promise<Account | null> {
    return await this.accountsService.getAccountById(id);
  }

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountsService.createAccount(createAccountDto);
  }
}
