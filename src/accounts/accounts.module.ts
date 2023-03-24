import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CryptoService } from '@crypto/crypto.service';
import { PrismaModule } from '@database/prisma.module';
import { CryptoModule } from '@crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  controllers: [AccountsController],
  providers: [AccountsService, CryptoService],
})
export class AccountsModule {}
