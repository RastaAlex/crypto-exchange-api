import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AccountsModule, CryptoModule, PrismaModule],
})
export class AppModule {}
