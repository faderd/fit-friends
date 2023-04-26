import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FoodDiaryRepository } from './food-diary.repository';
import { CreateFoodDiaryDto } from '../dto/create-food-diary.dto';
import { FoodDiaryEntity } from './food-diary.entity';
import { UpdateFoodDiaryDto } from '../dto/update-food-diary.dto';

@Injectable()
export class FoodDiaryService {
  constructor(
    private readonly foodDiaryRepository: FoodDiaryRepository,
  ) { }

  async create(dto: CreateFoodDiaryDto, userId: number) {
    const existFoodDiary = await this.foodDiaryRepository.findByUserId(userId);
    if (existFoodDiary) {
      throw new ConflictException(userId);
    }

    const { diary } = dto;
    const foodDiary = { diary, userId };

    const foodDiaryEntity = new FoodDiaryEntity(foodDiary);

    const createdFoodDiary = await this.foodDiaryRepository.create(foodDiaryEntity);

    return createdFoodDiary;
  }

  async getById(id: number) {
    const existFoodDiary = await this.foodDiaryRepository.findById(id);
    if (!existFoodDiary) {
      throw new NotFoundException(id);
    }

    return existFoodDiary;
  }

  async getByUserId(id: number) {
    return this.foodDiaryRepository.findByUserId(id);
  }

  async update(dto: UpdateFoodDiaryDto, userId: number) {
    const existFoodDiary = await this.foodDiaryRepository.findByUserId(userId);

    if (!existFoodDiary) {
      throw new NotFoundException(userId);
    }

    if (existFoodDiary.userId !== userId) {
      throw new ConflictException('Нельзя редактировать чужие дневники');
    }

    const foodDiaryEntity = new FoodDiaryEntity({ ...existFoodDiary, ...dto });

    return this.foodDiaryRepository.update(existFoodDiary.id, foodDiaryEntity);
  }
}
