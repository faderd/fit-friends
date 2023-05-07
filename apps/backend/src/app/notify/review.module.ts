import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { NotifyRepository } from './notify.repository';

@Module({
  imports: [PrismaModule],
  controllers: [NotifyController],
  providers: [NotifyRepository, NotifyService],
})
export class NotifyModule {}
