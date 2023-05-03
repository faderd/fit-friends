import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserBalanceRepository } from './user-balance.repository';
import { UserBalanceService } from './user-balance.service';
import { UserBalanceController } from './user-balance.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserBalanceController],
  providers: [UserBalanceRepository, UserBalanceService],
})
export class UserBalanceModule {}
