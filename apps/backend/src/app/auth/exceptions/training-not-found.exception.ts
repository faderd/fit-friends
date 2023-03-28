import { NotFoundException } from '@nestjs/common';

export class TrainingNotFoundException extends NotFoundException {
  constructor(trainingId: number) {
    super(`Training with the id — ${trainingId} not found`);
  }
}
