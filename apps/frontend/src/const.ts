import { Gender, TrainingDuration, TrainingLevel, TrainingType, UserLocation, UserRole } from '@fit-friends/shared-types';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Intro = '/',
  Register = '/register',
  Login = '/login',
  Main = '/main',
  QuestionaireCoach = '/questionnaire-coach',
  QuestionaireUser = '/questionnaire-user',
}

export enum PageTitle {
  Intro = 'Разводящая — FitFriends',
  Register = 'Войти — FitFriends',
  Login = 'Войти — FitFriends',
  Questionaire = 'Опросник — FitFriends',
}

export const DEFAULT_LOCATION = UserLocation.Petrogradskaya;
export const DEFAULT_GENDER = Gender.Male;
export const DEFAULT_ROLE = UserRole.User;
export const DEFAULT_TRAINING_DURATION = TrainingDuration.Range30to50;
export const DEFAULT_TRAINING_LEVEL = TrainingLevel.Amateur;
export const DEFAULT_IS_READY_TO_TRAIN = true;

export type RegisterDataUser = {
  name: string,
  email: string,
  password: string,
  gender: Gender,
  birthDate?: Date,
  role: UserRole,
  location: UserLocation,
  avatar: null | File,
}

export type RegisterDataQuestionnaireUser = {
  trainingLevel: TrainingLevel,
  trainingTypes: TrainingType[],
  trainingDuration: TrainingDuration,
  caloriesLoss: number,
  burnsCaloriesPerDay: number,
}

export type RegisterDataQuestionnaireCoach = {
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  certificate: File;
  merits: string;
  isReadyToTrain: boolean;
}
