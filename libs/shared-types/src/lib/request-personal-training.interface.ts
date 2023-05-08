import { StatusRequestTraining } from './status-request-training.enum';

export interface RequestPersonalTrainingInterface {
  id?: number;
  initiatorUserId: number;
  targetUserId: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusRequestTraining;
}
