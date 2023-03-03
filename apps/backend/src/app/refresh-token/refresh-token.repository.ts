import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenModel } from './refresh-token.model';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TokenInterface } from '@fit-friends/shared-types';

export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenModel>) {
  }

  public async create(item: RefreshTokenEntity): Promise<TokenInterface> {
    return new this.refreshTokenModel(item).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel
      .deleteOne({ tokenId });
  }

  public async findByTokenId(tokenId: string): Promise<TokenInterface | null> {
    return this.refreshTokenModel
      .findOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel
      .deleteMany({ expiresIn: { $lt: new Date()}})
  }
}
