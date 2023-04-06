import { NotFoundException } from '@nestjs/common';

export class UserNotUserException extends NotFoundException {
  constructor() {
    super('Это действие может выполнить только пользователь');
  }
}
