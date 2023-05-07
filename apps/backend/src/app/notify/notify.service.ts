import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { NotifyEntity } from './notify.entity';
import { NotifyQuery } from './query/notify.query';
import { NotifyRepository } from './notify.repository';
import { CreateNotifyDto } from '../dto/create-notify.dto';
import { UpdateNotifyDto } from '../dto/update-notify.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyRepository: NotifyRepository,
  ) { }
  async create(dto: CreateNotifyDto) {
    const { text, userId } = dto;

    const notify = { text, userId, notificationDate: new Date() };

    const notifyEntity = new NotifyEntity(notify);

    const createdNotify = await this.notifyRepository.create(notifyEntity);

    return createdNotify;
  }

  async getById(id: number) {
    const existNotify = await this.notifyRepository.findById(id);

    if (!existNotify) {
      throw new NotFoundException(id);
    }

    return existNotify;
  }

  async getByUserId(userId: number, query: NotifyQuery) {
    return this.notifyRepository.findByUserId(userId, query);
  }

  async update(id: number, dto: UpdateNotifyDto) {
    const existNotify = await this.getById(id);
    const notifyEntity = new NotifyEntity({ ...existNotify, ...dto });
    return this.notifyRepository.update(existNotify.id, notifyEntity);
  }

  async delete(notifyId: number, userId: number) {
    const existNotify = await this.notifyRepository.findById(notifyId);
    if (existNotify && existNotify.userId === userId) {
      return this.notifyRepository.destroy(notifyId);
    } else {
      throw new ConflictException();
    }
  }
}
