export interface TokenInterface {
  id?: number;
  tokenId: string;
  createdAt: Date;
  userId: number;
  expiresIn: Date;
}
