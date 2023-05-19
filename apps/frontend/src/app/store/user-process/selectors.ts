import { AuthorizationStatus, NameSpace } from '../../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getUser = (state: State) => state[NameSpace.User].user;
export const getUserId = (state: State) => state[NameSpace.User].user?.id;

export const getFavoriteGyms = (state: State) => state[NameSpace.User].user?.myFavoriteGyms;

export const getUsers = (state: State) => state[NameSpace.User].users;

export const getUserById = (id: number) => (state: State) => state[NameSpace.User].users.find((user: UserData) => user.id === id);

export const getIsFriend = (id: number) => (state: State) => {
  if (state[NameSpace.User].user && id) {
    const userFriends = state[NameSpace.User].user.friends || [];
    return userFriends.includes(id);
  }
}

export const getQuestionnaire = (state: State) => state[NameSpace.User].questionnaire;

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const isUserAuthorized = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const isAuthUnknown = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;

export const getIsToQuestionnairePage = (state: State) => state[NameSpace.User].isToQuestionnairePage;

export const getRegisterDataUser = (state: State) => state[NameSpace.User].registerDataUser;
