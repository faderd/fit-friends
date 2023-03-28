import { Injectable } from '@nestjs/common';
import { TrainingNotFoundException } from '../auth/exceptions/training-not-found.exception';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { TrainingEntity } from './training.entity';
import { TrainingRepository } from './training.repository';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
  ) { }

  async create(dto: CreateTrainingDto, coachId: number) {
    const { name, backgroundImage, level, type, trainingDuration, price, calories, description, gender, video, isSpecialOffer } = dto;
    const training = { name, backgroundImage, level, type, trainingDuration, price, calories, description, gender, video, rate: 0, userId: coachId, isSpecialOffer };

    const trainingEntity = new TrainingEntity(training);

    const createdTraining = await this.trainingRepository.create(trainingEntity);

    return createdTraining;
  }

  async getTraining(id: number) {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundException(id);
    }

    return existTraining;
  }

  async updateTraining(trainingId: number, dto: UpdateTrainingDto) {
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      throw new TrainingNotFoundException(trainingId);
    }

    const trainingEntity = new TrainingEntity({ ...existTraining, ...dto });
    return this.trainingRepository.update(existTraining.id, trainingEntity);
  }
}
