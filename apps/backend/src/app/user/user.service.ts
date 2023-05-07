import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQuery } from './query/user.query';
import { UserEntity } from './user.entity';
import { UserNotFoundException } from '../auth/exceptions';
import { UserRole } from '@fit-friends/shared-types';

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

  async addFriend(userId: number, newFriendId: number) {
    const existNewFriend = await this.userRepository.findById(newFriendId);
    if (!existNewFriend || existNewFriend.id === userId) {
      throw new UserNotFoundException(newFriendId);
    }

    // сначала добавим себя в список друзей пользователя
    const newFriend = await this.userRepository.findById(newFriendId);
    newFriend.friends.push(userId);
    const newFriendFriends = Array.from(new Set(newFriend.friends));
    const newFriendEntity = new UserEntity({ ...newFriend, friends: newFriendFriends });
    await this.userRepository.update(newFriendId, newFriendEntity);

    // теперь добавим в свой список друзей нового друга
    const user = await this.userRepository.findById(userId);
    user.friends.push(newFriendId);
    const userFriends = Array.from(new Set(user.friends));

    const userEntity = new UserEntity({ ...user, friends: userFriends });
    return this.userRepository.update(userId, userEntity);
  }

  async removeFriend(userId: number, friendId: number) {
    // сначала удалим себя из друзей пользователя
    const existFriend = await this.userRepository.findById(friendId);
    existFriend.friends = existFriend.friends.filter((id) => id !== userId);
    const existFriendEntity = new UserEntity({ ...existFriend });
    await this.userRepository.update(friendId, existFriendEntity);

    // теперь удалим друга из своего списка друзей
    const existUser = await this.userRepository.findById(userId);
    existUser.friends = existUser.friends.filter((id) => id !== friendId);
    const existUserEntity = new UserEntity({ ...existUser });
    return this.userRepository.update(userId, existUserEntity);
  }

  async addSubscriber(coachId: number, subscriberId: number) {
    const existCoach = await this.userRepository.findById(coachId);

    if (!existCoach || existCoach.role !== UserRole.Coach) {
      throw new UserNotFoundException(coachId);
    }

    existCoach.subscribers.push(subscriberId);
    const subscribers = Array.from(new Set(existCoach.subscribers));

    const coachEntity = new UserEntity({ ...existCoach, subscribers })
    return this.userRepository.update(coachId, coachEntity);
  }

  async removeSubscriber(coachId: number, subscriberId: number) {
    const existCoach = await this.userRepository.findById(coachId);

    if (!existCoach || existCoach.role !== UserRole.Coach) {
      throw new UserNotFoundException(coachId);
    }

    existCoach.subscribers = existCoach.subscribers.filter((id) => id !== subscriberId);

    const coachEntity = new UserEntity({ ...existCoach })
    return this.userRepository.update(coachId, coachEntity);
  }

  async getUser(id: number) {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundException(id);
    }

    return existUser;
  }
}
