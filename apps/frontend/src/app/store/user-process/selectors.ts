import { AuthorizationStatus, NameSpace } from '../../../const';
import { State } from '../../types/state';

export const getUser = (state: State) => state[NameSpace.User].user;

export const getQuestionnaire = (state: State) => state[NameSpace.User].questionnaire;

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const isUserAuthorized = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const isAuthUnknown = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;

export const getIsToQuestionnairePage = (state: State) => state[NameSpace.User].isToQuestionnairePage;

export const getRegisterDataUser = (state: State) => state[NameSpace.User].registerDataUser;
