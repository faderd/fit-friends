import { NotFoundException } from '@nestjs/common';

export class UserNotCoachException extends NotFoundException {
  constructor() {
    super('Это действие может выполнить только пользователь с ролью тренер');
  }
}
