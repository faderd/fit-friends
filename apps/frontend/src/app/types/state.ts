import { GymInterface, OrderInterface, ReviewInterface, TrainingInterface } from '@fit-friends/shared-types';
import { AuthorizationStatus } from '../../const';
import { store } from '../store';
import { QuestionnaireData } from './questionnaire-data';
import { RegisterDataUser } from './register-data-user.dto';
import { UserData } from './user-data';
import { CoachOrdersInfo } from './coach-orders-info';

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  isDataLoaded: boolean,
  trainings: TrainingInterface[],
  training: TrainingInterface | null,
  reviews: ReviewInterface[],
  gyms: GymInterface[],
  gym: GymInterface | null,
  orders: OrderInterface[],
  coachOrdersInfo: CoachOrdersInfo[],
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  user: UserData | null;
  users: UserData[];
  questionnaire: QuestionnaireData | null;
  isToQuestionnairePage: boolean,
  registerDataUser: RegisterDataUser | null,
}

export type State = ReturnType<typeof store.getState>;
