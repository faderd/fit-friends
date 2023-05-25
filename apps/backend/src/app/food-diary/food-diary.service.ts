import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryEntity } from './food-diary.entity';
import { UpdateFoodDiaryDto } from '../dto/update-food-diary.dto';
import { EmptyDiary } from './food-diary.const';

@Injectable()
export class FoodDiaryService {
  constructor(
    private readonly foodDiaryRepository: FoodDiaryRepository,
  ) { }

  async create(userId: number) {
    const existFoodDiary = await this.foodDiaryRepository.findByUserId(userId);
    if (existFoodDiary) {
      throw new ConflictException(userId);
    }

    const foodDiaryEntity = new FoodDiaryEntity({
      userId, diary: EmptyDiary
    });

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
