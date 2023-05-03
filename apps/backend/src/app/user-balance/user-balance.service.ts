import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { CreateUserBalanceDto } from '../dto/create-user-balance.dto';
import { UserBalanceEntity } from './user-balance.entity';
import { UpdateUserBalanceDto } from '../dto/update-user-balance.dto';

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
  ) { }

  async create(dto: CreateUserBalanceDto, userId: number) {
    const { entityType, entityCount } = dto;

    const userBalance = { entityType, entityCount, userId };

    const userBalanceEntity = new UserBalanceEntity(userBalance);

    return this.userBalanceRepository.create(userBalanceEntity);
  }

  async getById(id: number) {
    const existUserBalance = await this.userBalanceRepository.findById(id);
    if (!existUserBalance) {
      throw new NotFoundException(id);
    }

    return existUserBalance;
  }

  async getByUserId(id: number) {
    return this.userBalanceRepository.findByUserId(id);
  }

  async update(dto: UpdateUserBalanceDto, id: number) {
    const existUserBalance = await this.userBalanceRepository.findById(id);

    if (!existUserBalance) {
      throw new NotFoundException(id);
    }

    if (existUserBalance.userId !== id) {
      throw new ConflictException('Нельзя редактировать чужие данные');
    }

    const userBalanceEntity = new UserBalanceEntity({ ...existUserBalance, ...dto });

    return this.userBalanceRepository.update(existUserBalance.id, userBalanceEntity);
  }
}
