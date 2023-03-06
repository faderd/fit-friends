import { RefreshTokenEntity } from './refresh-token.entity';
import { TokenInterface } from '@fit-friends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    private readonly prisma: PrismaService) { }

  public async create(item: RefreshTokenEntity): Promise<TokenInterface> {
    const entityData = item.toObject();

    return this.prisma.refreshSessions.create({
      data: entityData
    });
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prisma.refreshSessions.deleteMany({
      where: { tokenId }
    });
  }

  public async findByTokenId(tokenId: string): Promise<TokenInterface | null> {
    return this.prisma.refreshSessions.findFirst({
      where: { tokenId }
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.refreshSessions.deleteMany({
      where: {
        expiresIn: {
          lt: new Date()
        }
      }
    });
  }
}
