import { NameSpace } from '../../../const';
import { State } from '../../types/state';

export const getIsDataLoaded = (state: State) => state[NameSpace.Data].isDataLoaded;

export const getTrainingsByUserId = (userId: number) => (state: State) => state[NameSpace.Data].trainings.filter((training) => training.userId === userId);
export const getTrainings = (state: State) => state[NameSpace.Data].trainings;
