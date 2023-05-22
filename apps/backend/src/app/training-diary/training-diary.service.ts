import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDiaryRepository } from './training-diary.repository';
import { TrainingDiaryEntity } from './training-diary.entity';
import { CreateTrainingDiaryDto } from '../dto/create-training-diary.dto';
import { UpdateTrainingDiaryDto } from '../dto/update-training-diary.dto';

@Injectable()
export class TrainingDiaryService {
  constructor(
    private readonly trainingDiaryRepository: TrainingDiaryRepository,
  ) { }

  // async create(dto: CreateTrainingDiaryDto, userId: number) {
  //   const existTrainingDiary = await this.trainingDiaryRepository.findByUserId(userId);
  //   if (existTrainingDiary) {
  //     throw new ConflictException(userId);
  //   }

  //   const { diary } = dto;
  //   const trainingDiary = { diary, userId };

  //   const trainingDiaryEntity = new TrainingDiaryEntity(trainingDiary);

  //   const createdTrainingDiary = await this.trainingDiaryRepository.create(trainingDiaryEntity);

  //   return createdTrainingDiary;
  // }

  async create(userId: number) {
    const existTrainingDiary = await this.trainingDiaryRepository.findByUserId(userId);
    if (existTrainingDiary) {
      throw new ConflictException(userId);
    }

    // const { diary } = dto;
    // const trainingDiary = { [], userId };

    const trainingDiaryEntity = new TrainingDiaryEntity({ userId, diary: [] });

    const createdTrainingDiary = await this.trainingDiaryRepository.create(trainingDiaryEntity);

    return createdTrainingDiary;
  }

  async getById(id: number) {
    const existTrainingDiary = await this.trainingDiaryRepository.findById(id);
    if (!existTrainingDiary) {
      throw new NotFoundException(id);
    }

    return existTrainingDiary;
  }

  async getByUserId(id: number) {
    return this.trainingDiaryRepository.findByUserId(id);
  }

  async update(dto: UpdateTrainingDiaryDto, userId: number) {
    const existTrainingDiary = await this.trainingDiaryRepository.findByUserId(userId);

    if (!existTrainingDiary) {
      throw new NotFoundException(userId);
    }

    if (existTrainingDiary.userId !== userId) {
      throw new ConflictException('Нельзя редактировать чужие дневники');
    }

    const diary = { ...existTrainingDiary.diary, ...dto.diary }

    const trainingDiaryEntity = new TrainingDiaryEntity({ ...existTrainingDiary, diary });

    return this.trainingDiaryRepository.update(existTrainingDiary.id, trainingDiaryEntity);
  }
}
