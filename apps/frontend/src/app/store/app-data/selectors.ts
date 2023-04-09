import { NameSpace } from '../../../const';
import { State } from '../../types/state';

export const getIsDataLoaded = (state: State) => state[NameSpace.Data].isDataLoaded;

export const getTrainingsByUserId = (userId: number) => (state: State) => state[NameSpace.Data].trainings.filter((training) => training.userId === userId);
export const getTrainings = (state: State) => state[NameSpace.Data].trainings;
export const getTrainingById = (id: number) => (state: State) => state[NameSpace.Data].trainings.find((training) => training.id === id);
export const getReviews = (state: State) => state[NameSpace.Data].reviews;
export const getGyms = (state: State) => state[NameSpace.Data].gyms;
export const getGymById = (id: number) => (state: State) => state[NameSpace.Data].gyms.find((gym) => gym.id === id);
