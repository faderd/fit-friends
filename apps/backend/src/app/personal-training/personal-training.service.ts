import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonalTrainingEntity } from './personal-training.entity';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingQuery } from './query/personal-training.query';
import { CreatePersonalTrainingDto } from '../dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from '../dto/update-personal-training.dto';
import { StatusRequestTraining } from '@fit-friends/shared-types';

@Injectable()
export class PersonalTrainingService {
  constructor(
    private readonly personalTrainingRepository: PersonalTrainingRepository,
  ) { }

  async create(dto: CreatePersonalTrainingDto, initiatorUserId: number) {
    const { targetUserId } = dto;

    const request = { targetUserId, status: StatusRequestTraining.Consideration, initiatorUserId, createdAt: new Date(), updatedAt: new Date() };

    const trainingEntity = new PersonalTrainingEntity(request);

    return this.personalTrainingRepository.create(trainingEntity);
  }

  async getRequest(id: number) {
    const existRequest = await this.personalTrainingRepository.findById(id);
    if (!existRequest) {
      throw new NotFoundException(id);
    }

    return existRequest;
  }

  async getRequestsByCoachId(targetUserId: number, query: PersonalTrainingQuery) {
    return this.personalTrainingRepository.findByInitiatorId(targetUserId, query);
  }

  async updateRequest(requestId: number, dto: UpdatePersonalTrainingDto, userId: number) {
    const existRequest = await this.personalTrainingRepository.findById(requestId);

    if (!existRequest) {
      throw new NotFoundException(requestId);
    }

    if (existRequest.status !== dto.status && existRequest.targetUserId === userId) {
      const requestEntity = new PersonalTrainingEntity({ ...existRequest, ...dto, updatedAt: new Date() });
      return this.personalTrainingRepository.update(existRequest.id, requestEntity);
    }
    return existRequest;
  }
}
