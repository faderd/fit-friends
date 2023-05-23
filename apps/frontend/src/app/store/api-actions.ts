import { GymInterface, OrderInterface, ReviewInterface, TrainingDiaryInterface, UserInterface, UserRole } from '@fit-friends/shared-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { RegisterDataQuestionnaireUser, RegisterDataQuestionnaireCoach } from '../../const';
import { dropAccessToken, dropRefreshToken, saveAccessToken, saveRefreshToken } from '../../services/token';
import { CreateTrainingDto } from '../types/create-training.dto';
import { QuestionnaireData } from '../types/questionnaire-data';
import { RegisterDataUser } from '../types/register-data-user.dto';
import { AppDispatch, State } from '../types/state';
import { UpdateUserDto } from '../types/update-user.dto';
import { UserRdo } from '../types/user-rdo';
import { redirectToPrevious } from './app-data/action';
import { storeCoachOrdersInfo, storeGyms, storeIsDataLoadedStatus, storeOrders, storePopularTrainings, storeReviews, storeTraining, storeTrainingDiary, storeTrainings, storeTrainingsForMe } from './app-data/app-data';
import { storeLookingForCompanyUsers, storeQuestionnaire, storeUser, storeUsers } from './user-process/user-process';
import { UpdateTrainingDto } from '../types/update-training.dto';
import { CreateReviewDto } from '../types/create-review.dto';
import { generatePath } from 'react-router-dom';
import { CreateOrderDto } from '../types/create-order.dto';
import { CoachOrdersInfo } from '../types/coach-orders-info';
import { getUrlQueryString } from '../../helpers';
import { TrainingRdo } from '../types/training-rdo';

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
    const { data } = await api.get('auth/login');
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
    dispatch(storeIsDataLoadedStatus(false));
    const { data } = await api.post<UserRdo>('auth/login', loginData);
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
    const { data } = await api.post<UserRdo>('auth/update', updateData);
    dispatch(storeUser(data));
    dispatch(storeIsDataLoadedStatus(true));
  }
);

export const fetchUsers = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/fetchUsers',
  async (_, { dispatch, extra: api }) => {
    dispatch(storeIsDataLoadedStatus(false));

    const { data } = await api.get<UserRdo[]>('user/');
    dispatch(storeUsers(data));
    dispatch(storeIsDataLoadedStatus(true));
  }
);

export const fetchLookingForCompanyUsers = createAsyncThunk<void,
  {
    limit?: number,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/fetchLookingForCompanyUsers',
  async ({ limit }, { dispatch, extra: api }) => {

    const { data } = await api.get<UserRdo[]>(`user/?isLookForCompany=true${'&limit=' + limit}`);
    dispatch(storeLookingForCompanyUsers(data));
  }
);

export const submitNewTraining = createAsyncThunk<void, CreateTrainingDto,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/submitNewTraining',
  async (createTrainingData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TrainingRdo>('training/', createTrainingData);
      dispatch(storeTraining(data));
      toast.info('Новая тренировка создана');
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.warn(`Ошибка: ${err.response.data.message}\n Код ошибки: ${err.response.status}`);
      }
    }
  }
);

export const fetchTrainings = createAsyncThunk<void,
  {
    limit?: string,
    sortDirection?: string,
    isOnlyFreeTrainings?: string,
    page?: string,
    minPrice?: string,
    // maxPrice?: string,
    minCalories?: string,
    // maxCalories?: string,
    minRate?: string,
    // maxRate?: string,
    trainingDuration?: string,
    trainingType?: string,
    trainingLevel?: string,
    sortType?: string,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTrainings',
  async (query, { dispatch, extra: api }) => {
    const urlString = getUrlQueryString(query, 'training/');
    const { data } = await api.get<TrainingRdo[]>(urlString);
    dispatch(storeTrainings(data));
  }
);

export const fetchSpecialForMeTrainings = createAsyncThunk<void,
  {
    trainingType?: string,
    trainingLevel?: string,
    limit?: string,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchSpecialForMeTrainings',
  async ({ trainingType, trainingLevel, limit }, { dispatch, extra: api }) => {
    const queryString = `${trainingType ? `&trainingType=${trainingType}` : ''}${trainingLevel ? `&trainingLevel=${trainingLevel}` : ''}${limit ? `&limit=${limit}` : ''}`;

    const { data } = await api.get<TrainingRdo[]>(`training/get-special-for-me/?${queryString}`);
    dispatch(storeTrainingsForMe(data));
  }
);

export const fetchPopularTrainings = createAsyncThunk<void,
  {
    limit?: string,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchPopularTrainings',
  async ({ limit }, { dispatch, extra: api }) => {
    const queryString = `sortType=byRate${limit ? `&limit=${limit}` : ''}`;

    const { data } = await api.get<TrainingRdo[]>(`training/?${queryString}`);
    dispatch(storePopularTrainings(data));
  }
);

export const fetchTraining = createAsyncThunk<TrainingRdo, number,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTraining',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<TrainingRdo>(`training/${id}`);
    return data;
  }
);

export const updateTraining = createAsyncThunk<void, UpdateTrainingDto,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/updateTraining',
  async (updateData, { dispatch, extra: api }) => {
    const { data } = await api.patch<TrainingRdo>(`training/${updateData.trainingId}`, updateData);
    dispatch(storeTraining(data));
  }
);

export const fetchReviews = createAsyncThunk<void,
  number,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchReviews',
  async (trainingId, { dispatch, extra: api }) => {
    const { data } = await api.get<ReviewInterface[]>(generatePath('review/:id', { id: trainingId.toString() }));
    dispatch(storeReviews(data));
  }
);

export const submitNewReview = createAsyncThunk<ReviewInterface | void, CreateReviewDto,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/submitNewReview',
  async (createReviewData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<ReviewInterface>('review/', { ...createReviewData });
      dispatch(fetchReviews(data.trainingId));
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.warn(`Ошибка: ${err.response.data.message}\n Код ошибки: ${err.response.status}`);
      }
    }
  }
);

export const fetchGyms = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchGyms',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<GymInterface[]>('gym/');
    dispatch(storeGyms(data));
  }
);

export const fetchGym = createAsyncThunk<GymInterface, number,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchGym',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<GymInterface>(`gym/${id}`);
    return data;
  }
);

export const fetchUserOrders = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchOrders',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<OrderInterface[]>('order/');
    dispatch(storeOrders(data));
  }
);

export const startTrainingOrder = createAsyncThunk<OrderInterface, { orderId: number },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/startTrainingOrder',
  async ({ orderId }, { dispatch, extra: api }) => {
    const urlString = `order/start/${orderId}`;
    const { data } = await api.get<OrderInterface>(urlString);
    return data;
  }
);

export const finishTrainingOrder = createAsyncThunk<OrderInterface, { orderId: number },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/finishTrainingOrder',
  async ({ orderId }, { dispatch, extra: api }) => {
    const urlString = `order/finish/${orderId}`;
    const { data } = await api.get<OrderInterface>(urlString);
    return data;
  }
);

export const fetchCoachOrders = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchCoachOrders',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<OrderInterface[]>('order/coach-orders');
    dispatch(storeOrders(data));
  }
);

export const fetchCoachOrdersInfo = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchCoachOrdersInfo',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<CoachOrdersInfo[]>('order/coach-orders-info');
    console.log('orderData: ', data);
    dispatch(storeCoachOrdersInfo(data));
  }
);

export const submitNewOrder = createAsyncThunk<OrderInterface | void, CreateOrderDto,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/submitNewOrder',
  async (createOrderData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OrderInterface>('order/', { ...createOrderData });
      dispatch(fetchUserOrders());
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.warn(`Ошибка: ${err.response.data.message}\n Код ошибки: ${err.response.status}`);
      }
    }
  }

);

export const fetchTrainingDiary = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTrainingDiary',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<TrainingDiaryInterface>('training-diary');
    console.log('trainingDiary: ', data);
    dispatch(storeTrainingDiary(data));
  }
);
