import { AuthorizationStatus } from '../../const';
import { store } from '../store';
import { QuestionnaireData } from './questionnaire-data';
import { RegisterDataUser } from './register-data-user.dto';
import { UserData } from './user-data';

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  isDataLoaded: boolean,
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  user: UserData | null;
  questionnaire: QuestionnaireData | null;
  isToQuestionnairePage: boolean,
  registerDataUser: RegisterDataUser | null,
}

export type State = ReturnType<typeof store.getState>;
