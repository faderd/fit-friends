import { TrainingType, UserRole } from '@fit-friends/shared-types';
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
