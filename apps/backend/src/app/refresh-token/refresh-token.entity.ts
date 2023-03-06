import { EntityInterface } from '@fit-friends/core';
import { TokenInterface } from '@fit-friends/shared-types';

export class RefreshTokenEntity implements EntityInterface<RefreshTokenEntity>, TokenInterface {
  public id: number;
  public tokenId: string;
  public userId: number;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: TokenInterface) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: TokenInterface): void {
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
