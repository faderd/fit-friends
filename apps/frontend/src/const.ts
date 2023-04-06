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
  Index = '/index',
  QuestionaireCoach = '/questionnaire-coach',
  QuestionaireUser = '/questionnaire-user',
  PersonalAccountCoach = '/personal-account-coach',
  PersonalAccountUser = '/personal-account-user',
  NotFound = '/not-found',
  UsersCatalog = '/users-catalog',
  UserCard = '/user-card/:id',
  CreateTraining = '/create-training',
  MyTrainings = '/my-trainings',
  TrainingCatalog = '/training-catalog',
  TrainingCard = '/training-card/:id',
}

export enum PageTitle {
  Intro = 'Разводящая — FitFriends',
  Register = 'Регистрация — FitFriends',
  Login = 'Войти — FitFriends',
  Questionaire = 'Опросник — FitFriends',
  Index = 'FitFriends',
  PersonalAccount = 'Личный кабинет — FitFriends',
  UsersCatalog = 'Каталог пользователей — FitFriends',
  UserCard = 'Карточка пользователя — FitFriends',
  CreateTraining = 'Создать тренировку — FitFriends',
  MyTrainings = 'Мои тренировки — FitFriends',
  TrainingCatalog = 'Каталог тренировок — FitFriends',
  TrainingCard = 'Карточка тренировки — FitFriends',
}

export enum PageType {
  PersonalAccount = 'PersonalAccount',
  Index = 'Index',
}

export const DEFAULT_LOCATION = UserLocation.Petrogradskaya;
export const DEFAULT_GENDER = Gender.Male;
export const DEFAULT_ROLE = UserRole.User;
export const DEFAULT_TRAINING_DURATION = TrainingDuration.Range30to50;
export const DEFAULT_TRAINING_LEVEL = TrainingLevel.Amateur;
export const DEFAULT_IS_READY_TO_TRAIN = true;
export const DEFAULT_FILTER_TRAINING_LEVEL = TrainingLevel.Amateur;
export const DEFAULT_SORT_DIRECTION = 'desc';

export type RegisterDataQuestionnaireUser = {
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  trainingDuration: TrainingDuration;
  caloriesLoss: number;
  burnsCaloriesPerDay: number;
}

export type RegisterDataQuestionnaireCoach = {
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  certificate: File;
  merits: string;
  isReadyToTrain: boolean;
}

export enum SearchParamUser {
  UserRoleSorting = 'userRoleSorting',
  LocationFilter = 'locationFilter',
  Specialization = 'specialization',
  TrainingLevel = 'trainingLevel',
}

export enum SearchParamMyTraining {
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice',
  MinCalories = 'minCalories',
  MaxCalories = 'maxCalories',
  MinRate = 'minRate',
  MaxRate = 'maxRate',
  TrainingDuration = 'trainingDuration',
  TrainingType = 'trainingType',
  SortDirection = 'sortDirection',
  IsOnlyFreeTrainings = 'isOnlyFreeTrainings',
}

export enum SortDirection {
  Desc = 'desc',
  Asc = 'asc',
}
