import { ConflictException, Injectable } from '@nestjs/common';
import { TrainingNotFoundException } from '../auth/exceptions/training-not-found.exception';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { TrainingEntity } from './training.entity';
import { TrainingRepository } from './training.repository';
import { TrainingQuery } from './query/training.query';
import { getTrainingBackground } from '../../helpers';
import { EmailSubscriberController } from '../email-subscriber/email-subscriber.controller';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly subscriberController: EmailSubscriberController
  ) { }

  async create(dto: CreateTrainingDto, coachId: number) {
    const { name, level, type, trainingDuration, price, calories, description, gender, video, isSpecialOffer } = dto;
    const training = { name, backgroundImage: getTrainingBackground(), level, type, trainingDuration, price, calories, description, gender, video, rate: 0, userId: coachId, isSpecialOffer: isSpecialOffer || false };

    const trainingEntity = new TrainingEntity(training);

    const createdTraining = await this.trainingRepository.create(trainingEntity);

    this.subscriberController.addNewTraining({newTrainingId: createdTraining.id, coachId});

    return createdTraining;
  }

  async getTraining(id: number) {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundException(id);
    }

    return existTraining;
  }

  async getTrainings(query: TrainingQuery) {
    return this.trainingRepository.findAll(query);
  }

  async getTrainingsByCoachId(id: number) {
    return this.trainingRepository.findByCoachId(id);
  }

  async updateTraining(trainingId: number, dto: UpdateTrainingDto | {rate: number}, userId: number) {
    const existTraining = await this.trainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new TrainingNotFoundException(trainingId);
    }

    if (existTraining.userId !== userId) {
      throw new ConflictException('Нельзя редактировать чужие тренировки');
    }

    const trainingEntity = new TrainingEntity({ ...existTraining, ...dto });
    return this.trainingRepository.update(existTraining.id, trainingEntity);
  }
}
