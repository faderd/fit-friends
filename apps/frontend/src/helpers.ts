import { GymInterface, OrderInterface, OrderType, TrainingDiaryItem, TrainingType, UserRole } from '@fit-friends/shared-types';
import { trainingsFilters } from './app/types/my-trainings-filters';
import { UserRdo } from './app/types/user-rdo';
import { UserFilters } from './app/types/user-filters';
import { gymFilters } from './app/types/gym-filters';
import { ordersFilters } from './app/types/orders-filters';
import { TrainingRdo } from './app/types/training-rdo';
import { DISCOUNT_EMOUNT, TrainingDurationForDiaryMask } from './const';

export const applyFilters = (users: UserRdo[], filters: UserFilters) => {
  let filteredUsers = users.slice();

  if (Array.isArray(filters.searchParamSpecialization)) {
    filters.searchParamSpecialization.forEach((trainingType) => {
      filteredUsers = filteredUsers.filter((user) =>
        user.questionnaire?.trainingTypes?.includes(trainingType as TrainingType)
      );
    });
  }

  if (Array.isArray(filters.searchParamLocationFilter)) {
    filteredUsers = filteredUsers.filter((user) => filters.searchParamLocationFilter?.includes(user.location));
  }

  if (filters.searchParamTrainingLevel) {
    filteredUsers = filteredUsers.filter((user) => user.questionnaire?.trainingLevel === filters.searchParamTrainingLevel);
  }

  if (filters.searchParamUserTypeSorting) {
    const users: UserRdo[] = [];
    const coaches: UserRdo[] = [];
    filteredUsers.forEach((user) => {


      if (user.role === UserRole.Coach) {
        users.push(user);
      }
      if (user.role === UserRole.User) {
        coaches.push(user);
      }
    });

    if (filters.searchParamUserTypeSorting === UserRole.Coach) {
      filteredUsers = users.concat(coaches);
    } else {
      filteredUsers = coaches.concat(users);
    }
  }

  return filteredUsers;
}

export const applyTrainingsFilters = (trainings: TrainingRdo[], filters: trainingsFilters) => {
  let filteredTrainings = trainings.slice();

  if (filters.searchParamMaxPrice) {
    const maxPrice = +filters.searchParamMaxPrice || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.price <= maxPrice);
  }

  // if (filters.searchParamMinPrice) {
  //   const minPrice = +filters.searchParamMinPrice || 0;
  //   filteredTrainings = filteredTrainings.filter((training) => training.price >= minPrice);
  // }

  if (filters.searchParamMaxCalories) {
    const maxCalories = +filters.searchParamMaxCalories || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.calories <= maxCalories);
  }

  // if (filters.searchParamMinCalories) {
  //   const minCalories = +filters.searchParamMinCalories || 0;
  //   filteredTrainings = filteredTrainings.filter((training) => training.calories >= minCalories);
  // }

  if (filters.searchParamMaxRate) {
    const maxRate = +filters.searchParamMaxRate || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.rate <= maxRate);
  }

  // if (filters.searchParamMinRate) {
  //   const minRate = +filters.searchParamMinRate || 0;
  //   filteredTrainings = filteredTrainings.filter((training) => training.rate >= minRate);
  // }

  // if (Array.isArray(filters.searchParamTrainingDuration)) {
  //   filteredTrainings = filteredTrainings.filter((training) => {
  //     return filters.searchParamTrainingDuration?.includes(training.trainingDuration);
  //   });
  // }

  // if (Array.isArray(filters.searchParamTrainingType)) {
  //   filteredTrainings = filteredTrainings.filter((training) => {
  //     return filters.searchParamTrainingType?.includes(training.type);
  //   });
  // }

  return filteredTrainings;
}

export const makeNewFriendsList = (
  action: 'add' | 'remove',
  id: number,
  friendsList: number[]
): number[] => {
  let updatedFriendsList = [...friendsList];

  switch (action) {
    case 'add':
      updatedFriendsList.push(id);
      break;
    case 'remove':
      updatedFriendsList = updatedFriendsList.filter((friendId) => friendId !== id);
      break;
    default:
      console.error(`Unsupported action: ${action}`);
      break;
  }

  return updatedFriendsList;
};

export const applyGymFilters = (gyms: GymInterface[], filters: gymFilters) => {
  let filteredGyms = gyms.slice();

  if (filters.searchParamIsOnlyVerified) {
    filteredGyms = filteredGyms.filter((gym) => gym.isVerified);
  }

  if (filters.searchParamLocation) {
    filteredGyms = filteredGyms.filter((gym) => filters.searchParamLocation?.includes(gym.location));
  }

  if (filters.searchParamMaxPrice) {
    const maxPrice = +filters.searchParamMaxPrice || 0;
    filteredGyms = filteredGyms.filter((gym) => gym.price <= maxPrice);
  }

  if (filters.searchParamMinPrice) {
    const minPrice = +filters.searchParamMinPrice || 0;
    filteredGyms = filteredGyms.filter((gym) => gym.price >= minPrice);
  }

  if (filters.searchParamOptions) {
    filteredGyms = filteredGyms.filter((gym) => {
      let isInclude = false;
      gym.options.forEach((option) => {
        if (filters.searchParamOptions?.includes(option)) {
          isInclude = true;
          return;
        }
      })

      return isInclude;
    })
  }
  return filteredGyms;
};

export const applyOrdersFilters = (orders: OrderInterface[], filters: ordersFilters) => {
  let filteredOrders = [...orders];

  if (filters.searchParamOrderType) {
    if (filters.searchParamOrderType === OrderType.Subscription) {
      filteredOrders = filteredOrders.filter((order) => order.type === OrderType.Subscription);
    }
    if (filters.searchParamOrderType === OrderType.Training) {
      filteredOrders = filteredOrders.filter((order) => order.type === OrderType.Training);
    }
  }

  return filteredOrders;
};

export const getTrainingPrice = (training: TrainingRdo | undefined | null) => {
  if (!training) { return; }
  if (!training.isSpecialOffer) { return training.price; }

  return Math.floor(training.price * (DISCOUNT_EMOUNT / 100));
};

export const getIsTrainingOrdered = (orders: OrderInterface[], trainingId: number) => orders.some((order) => order.type === OrderType.Training && order.entityId === trainingId);

export const getIsTrainingStarted = (orders: OrderInterface[], trainingId: number) => orders.some((order) => order.type === OrderType.Training && order.entityId === trainingId && order.isStarted);

export const getOrderIdByTrainingId = (orders: OrderInterface[], trainingId: number) => orders.find((order) => order.type === OrderType.Training && order.entityId === trainingId)?.id;

export const getMaxTrainigsInDay = (diary: TrainingDiaryItem[] | undefined) => {
  if (!diary) { return 0; }

  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  let max = 0;

  for (let i = 1; i <= currentDay; i++) {
    const localMax = diary.filter((item) => {
      const dateTraining = new Date(item.dateTraining);
      const dateComparsion = new Date();
      dateComparsion.setDate(dateComparsion.getDate() - (i - 1));

      return dateTraining.toDateString() === dateComparsion.toDateString();
    }).length;

    if (localMax > max) { max = localMax; }
  }

  return max;
};

export const getCaloryOrTimeInTrainigByDiary = (day: number, trainingNum: number, diary: TrainingDiaryItem[] | undefined, whatGet: 'calory' | 'time') => {
  if (!diary) { return 0; }

  const currentDay = (new Date()).getDay();
  const calculatedDate = new Date();
  calculatedDate.setDate(calculatedDate.getDate() - (currentDay - day));

  let trainingCalculatedNum = 1;

  for (const diaryItem of diary) {
    const trainingDate = new Date(diaryItem.dateTraining);

    if (trainingDate.toDateString() !== calculatedDate.toDateString()) { continue; }

    if (trainingCalculatedNum === trainingNum) {
      if (whatGet === 'time') { return TrainingDurationForDiaryMask[diaryItem.trainingDuration]; }
      if (whatGet === 'calory') { return diaryItem.caloriesLoss; }
    }

    trainingCalculatedNum++;
  };

  return 0;
};

export const getUrlQueryString = <T extends Record<string, string>>(params: T, url: string): string => {
  const paramsString = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      paramsString.append(key, params[key]);
    }
  }

  return `${url}?${paramsString.toString()}`;
};
