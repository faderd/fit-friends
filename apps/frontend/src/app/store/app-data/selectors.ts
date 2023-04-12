import { NameSpace } from '../../../const';
import { State } from '../../types/state';

export const getIsDataLoaded = (state: State) => state[NameSpace.Data].isDataLoaded;

export const getTrainingsByUserId = (userId: number) => (state: State) => state[NameSpace.Data].trainings.filter((training) => training.userId === userId);
export const getTrainings = (state: State) => state[NameSpace.Data].trainings;
export const getTraining = (state: State) => state[NameSpace.Data].training;
export const getTrainingById = (id: number) => (state: State) => state[NameSpace.Data].trainings.find((training) => training.id === id);

export const getReviews = (state: State) => state[NameSpace.Data].reviews;

export const getGyms = (state: State) => state[NameSpace.Data].gyms;
export const getGym = (state: State) => state[NameSpace.Data].gym;
export const getGymById = (id: number) => (state: State) => state[NameSpace.Data].gyms.find((gym) => gym.id === id);

export const getOrders = (state: State) => state[NameSpace.Data].orders;
export const getCoachOrdersInfo = (state: State) => state[NameSpace.Data].coachOrdersInfo;
export const getOrderById = (id: number) => (state: State) => state[NameSpace.Data].orders.find((order) => order.id === id);
