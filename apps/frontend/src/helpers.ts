import { TrainingDuration, TrainingInterface, TrainingType, UserRole } from '@fit-friends/shared-types';
import { trainingsFilters } from './app/types/my-trainings-filters';
import { UserData } from './app/types/user-data';
import { UserFilters } from './app/types/user-filters';

export const applyFilters = (users: UserData[], filters: UserFilters) => {
  let filteredUsers = users.map((user) => user);

  if (Array.isArray(filters.searchParamSpecialization)) {
    filters.searchParamSpecialization.forEach((trainingType) => {
      filteredUsers = filteredUsers.filter((user) => {
        return user.questionnaire?.trainingTypes?.includes(trainingType as TrainingType);
      });
    });
  }

  if (Array.isArray(filters.searchParamLocationFilter)) {
    filteredUsers = filteredUsers.filter((user) => filters.searchParamLocationFilter?.includes(user.location));
  }

  if (filters.searchParamTrainingLevel) {
    filteredUsers = filteredUsers.filter((user) => user.questionnaire?.trainingLevel === filters.searchParamTrainingLevel);
  }

  if (filters.searchParamUserTypeSorting) {
    const users: UserData[] = [];
    const coaches: UserData[] = [];
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

export const applyTrainingsFilters = (trainings: TrainingInterface[], filters: trainingsFilters) => {
  let filteredTrainings = trainings.map((user) => user);

  if (filters.searchParamMaxPrice) {
    const maxPrice = +filters.searchParamMaxPrice || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.price <= maxPrice);
  }

  if (filters.searchParamMinPrice) {
    const minPrice = +filters.searchParamMinPrice || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.price >= minPrice);
  }

  if (filters.searchParamMaxCalories) {
    const maxCalories = +filters.searchParamMaxCalories || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.calories <= maxCalories);
  }

  if (filters.searchParamMinCalories) {
    const minCalories = +filters.searchParamMinCalories || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.calories >= minCalories);
  }

  if (filters.searchParamMaxRate) {
    const maxRate = +filters.searchParamMaxRate || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.rate <= maxRate);
  }

  if (filters.searchParamMinRate) {
    const minRate = +filters.searchParamMinRate || 0;
    filteredTrainings = filteredTrainings.filter((training) => training.rate >= minRate);
  }

  if (Array.isArray(filters.searchParamTrainingDuration)) {
    filteredTrainings = filteredTrainings.filter((training) => {
      return filters.searchParamTrainingDuration?.includes(training.trainingDuration);
    });
  }

  if (Array.isArray(filters.searchParamTrainingType)) {
    filteredTrainings = filteredTrainings.filter((training) => {
      return filters.searchParamTrainingType?.includes(training.type);
    });
  }

  return filteredTrainings;
}

export const makeNewFriendsList = (action: 'add' | 'remove', id: number, userFriends: number[]): number[] => {
  const newUserFriends = [...userFriends];

  if (action === 'add') {
    newUserFriends.push(id);
    return newUserFriends;
  }

  const index = newUserFriends.findIndex((friendId) => friendId === id);
  newUserFriends.splice(index, 1);

  return newUserFriends;
};
