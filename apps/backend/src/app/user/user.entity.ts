import { EntityInterface } from '@fit-friends/core';
import { Gender, UserInterface, UserLocation, UserRole } from '@fit-friends/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.const';

export class UserEntity implements EntityInterface<UserEntity>, UserInterface {
  public id?: number;
  public name: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public gender: Gender;
  public birthDate: Date | string;
  public role: UserRole;
  public location: UserLocation;
  public createdAt: Date;
  public friends: number[];
  public myFavoriteGyms: number[];

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public toObject(): UserEntity {
    return { ...this };
  }

  public fillEntity(user: UserInterface): void {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.role = user.role;
    this.location = user.location;
    this.createdAt = user.createdAt;
    this.friends = user.friends;
    this.myFavoriteGyms = user.myFavoriteGyms;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
