import { UserInterface, UserRole } from '@fit-friends/shared-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { RegisterDataQuestionnaireUser, RegisterDataQuestionnaireCoach } from '../../const';
import { dropAccessToken, dropRefreshToken, saveAccessToken, saveRefreshToken } from '../../services/token';
import { QuestionnaireData } from '../types/questionnaire-data';
import { RegisterDataUser } from '../types/register-data-user.dto';
import { AppDispatch, State } from '../types/state';
import { UpdateUserDto } from '../types/update-user.dto';
import { UserData } from '../types/user-data';
import { redirectToPrevious } from './app-data/action';
import { storeIsDataLoadedStatus } from './app-data/app-data';
import { storeQuestionnaire, storeUser } from './user-process/user-process';

export const register = createAsyncThunk<
  UserInterface,
  {
    registerDataUser: RegisterDataUser,
    registerDataQuestionnaire: RegisterDataQuestionnaireCoach | RegisterDataQuestionnaireUser
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/register',
  async (registerData, { dispatch, extra: api }) => {
    const userRegisterDto = { ...registerData.registerDataUser, questionnaire: registerData.registerDataQuestionnaire };

    const formData = new FormData();
    try {
      const { data } = await api.post('auth/register', userRegisterDto);

      if (registerData.registerDataUser.avatar) {
        formData.append('avatar', registerData.registerDataUser.avatar as File);
      }

      if (registerData.registerDataUser.role === UserRole.Coach) {
        const questionnaireData = registerData.registerDataQuestionnaire as RegisterDataQuestionnaireCoach;
        formData.append('certificate', questionnaireData.certificate as File);
      }

      dispatch(storeIsDataLoadedStatus(false));
      await api.post(`auth/upload/${data.id}`, formData);
      dispatch(storeIsDataLoadedStatus(true));

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.warn(`Ошибка регистрации: ${err.response.data.message}\n Код ошибки: ${err.response.status}`);
      }
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));
    const { data } = await api.get('auth/login');
    dispatch(storeUser(data));
    dispatch(storeIsDataLoadedStatus(true));
  }
);

export const login = createAsyncThunk<void,
  {
    email: string,
    password: string,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/login',
  async (loginData, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));
    const { data } = await api.post<UserData>('auth/login', loginData);
    if (data.access_token && data.refresh_token) {
      saveAccessToken(data.access_token);
      saveRefreshToken(data.refresh_token);
    }

    dispatch(storeUser(data));
    dispatch(storeIsDataLoadedStatus(true));
    dispatch(redirectToPrevious());
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.get('auth/logout');
    dropAccessToken();
    dropRefreshToken();
  }
);

export const fetchQuestionnaire = createAsyncThunk<void, number,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/fetchQuestionnaire',
  async (userId, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));
    const { data } = await api.get<QuestionnaireData>(`auth/questionnaire/${userId}`);

    dispatch(storeQuestionnaire(data));
    dispatch(storeIsDataLoadedStatus(true));
  }
);

export const updateQuestionnaire = createAsyncThunk<void, QuestionnaireData,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/updateQuestionnaire',
  async (updateData, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));

    const { data } = await api.post<QuestionnaireData>('auth/questionnaire', updateData);

    dispatch(storeQuestionnaire(data));
    dispatch(storeIsDataLoadedStatus(true));
  }
);

export const updateUser = createAsyncThunk<void, UpdateUserDto,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/updateUser',
  async (updateData, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));

      const { data } = await api.post<UserData>('auth/update', updateData);
      dispatch(storeUser(data));
      dispatch(storeIsDataLoadedStatus(true));
  }
);
