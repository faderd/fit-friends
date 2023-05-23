import { GymInterface, OrderInterface, ReviewInterface, TrainingDiaryInterface } from '@fit-friends/shared-types';
import { AuthorizationStatus } from '../../const';
import { store } from '../store';
import { QuestionnaireData } from './questionnaire-data';
import { RegisterDataUser } from './register-data-user.dto';
import { UserRdo } from './user-rdo';
import { CoachOrdersInfo } from './coach-orders-info';
import { TrainingRdo } from './training-rdo';

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  isDataLoaded: boolean,
  trainings: TrainingRdo[],
  training: TrainingRdo | null,
  reviews: ReviewInterface[],
  gyms: GymInterface[],
  gym: GymInterface | null,
  orders: OrderInterface[],
  coachOrdersInfo: CoachOrdersInfo[],
  trainingsForMe: TrainingRdo[],
  popularTrainings: TrainingRdo[],
  trainingDiary: TrainingDiaryInterface | null,
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  user: UserRdo | null,
  users: UserRdo[],
  questionnaire: QuestionnaireData | null;
  isToQuestionnairePage: boolean,
  registerDataUser: RegisterDataUser | null,
  lookingForCompanyUsers: UserRdo[],
}

export type State = ReturnType<typeof store.getState>;
