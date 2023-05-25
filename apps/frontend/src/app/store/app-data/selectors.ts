import { UserLocation } from '@fit-friends/shared-types';
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

export const getOrders = (state: State) => state[NameSpace.Data].orders.map;
export const getOpenedOrders = (state: State) => state[NameSpace.Data].orders.filter((order) => !order.isClosed);
export const getCoachOrdersInfo = (state: State) => state[NameSpace.Data].coachOrdersInfo;
export const getOrderById = (id: number) => (state: State) => state[NameSpace.Data].orders.find((order) => order.id === id);
export const getTrainingsForMe = (state: State) => state[NameSpace.Data].trainingsForMe;
export const getPopularTrainings = (state: State) => state[NameSpace.Data].popularTrainings;
export const getSpecialOffers = (specialOffersCount: number) => (state: State) => {
  let counter = 0;
  return state[NameSpace.Data].trainings.filter((training) => {
    if (training.isSpecialOffer && counter < specialOffersCount) {
      counter++;
      return true;
    }
    return false;
  });
};
export const getNearestGym = (location: UserLocation | undefined) => (state: State) => {
  if (location === undefined) { return null; }
  const gym = state[NameSpace.Data].gyms.find((gym) => gym.location === location);
  return gym || state[NameSpace.Data].gyms[0];
}
export const getTrainingDiary = (state: State) => state[NameSpace.Data].trainingDiary;
export const getFoodDiary = (state: State) => state[NameSpace.Data].foodDiary;
