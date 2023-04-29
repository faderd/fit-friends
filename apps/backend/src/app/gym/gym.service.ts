import { Injectable, NotFoundException } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { GymEntity } from './gym.entity';
import { GymQuery } from './query/gym.query';
import { CreateGymDto } from '../dto/create-gym.dto';
import { UpdateGymDto } from '../dto/update-gym.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GymService {
  constructor(
    private readonly gymRepository: GymRepository,
    private readonly authService: AuthService,
  ) { }

  async create(dto: CreateGymDto) {
    const { name, location, isVerified, options, photos, description, price } = dto;

    const gym = { name, location, isVerified, options, photos, description, price, createdAt: new Date() };

    const gymEntity = new GymEntity(gym);

    const createdReview = await this.gymRepository.create(gymEntity);
    return createdReview;
  }

  async getById(id: number) {
    const existGym = await this.gymRepository.findById(id);

    if (!existGym) {
      throw new NotFoundException(id);
    }

    return existGym;
  }

  async getAll(query: GymQuery) {
    return this.gymRepository.findAll(query);
  }

  async update(id: number, dto: UpdateGymDto) {
    const existGym = await this.getById(id);
    const gymEntity = new GymEntity({ ...existGym, ...dto });
    return this.gymRepository.update(existGym.id, gymEntity);
  }

  async addFavoriteGym(userId: number, newFavoriteGymId: number) {
    const existUser = await this.authService.getUser(userId);
    existUser.myFavoriteGyms.push(newFavoriteGymId);
    const myFavoriteGyms = Array.from(new Set(existUser.myFavoriteGyms));
    return this.authService.updateUser(userId, {myFavoriteGyms});
  }
}
