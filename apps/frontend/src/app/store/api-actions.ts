import { UserInterface, UserRole } from '@fit-friends/shared-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { RegisterDataUser, RegisterDataQuestionnaireUser, RegisterDataQuestionnaireCoach } from '../../const';
import { dropAccessToken, dropRefreshToken, saveAccessToken, saveRefreshToken } from '../../services/token';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/userData';
import { redirectToPrevious } from './app-data/action';
import { storeUser } from './user-process/user-process';

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
      const { data } = await api.post('/auth/register', userRegisterDto);

      if (registerData.registerDataUser.avatar) {
        formData.append('avatar', registerData.registerDataUser.avatar as File);
      }

      if (registerData.registerDataUser.role === UserRole.Coach) {
        const questionnaireData = registerData.registerDataQuestionnaire as RegisterDataQuestionnaireCoach;
        formData.append('certificate', questionnaireData.certificate as File);
      }

      await api.post(`auth/upload/${data.id}`, formData);

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
    const { data } = await api.get('');

    dispatch(storeUser(data));
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
    const { data } = await api.post<UserData>('', loginData);
    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    dispatch(storeUser(data));
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
    const res = await api.get('');
    if (res) {
      dropAccessToken();
      dropRefreshToken();
    }
  }
);
