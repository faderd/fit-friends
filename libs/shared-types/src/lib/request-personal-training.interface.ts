import { StatusRequestTraining } from './status-request-training.enum';

export interface RequestPersonalTrainingInterface {
  id?: number;
  initiator: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusRequestTraining;
}
