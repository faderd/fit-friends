import { EntityInterface } from '@fit-friends/core';
import { Token } from '@fit-friends/shared-types';

export class RefreshTokenEntity implements EntityInterface<RefreshTokenEntity>, Token {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this }
  }
}
