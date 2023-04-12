import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async getUsers(query: UserQuery) {
    return this.userRepository.findAll(query);
  }

  async getMyFriends(query: UserQuery, userId: number) {
    return this.userRepository.findFriends(query, userId);
  }
}
