import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RegisterDataUser } from '../../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/userData';
import { checkAuth, login, logout } from '../api-actions';

export const getInitialStateUserProcess = (): UserProcess => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
  name: null,
  role: null,

  // флаг означает, что первый этап регистрации пройден и можно переходить к опроснику, если нет то страница с опросником недоступна
  isToQuestionnairePage: false,
  registerDataUser: null,
});

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState: getInitialStateUserProcess(),
  reducers: {
    storeUser: (state, action: PayloadAction<UserData>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    storeIsToQuestionnairePage: (state, action: PayloadAction<boolean>) => {
      state.isToQuestionnairePage = action.payload;
    },
    storeRegisterDataUser: (state, action: PayloadAction<RegisterDataUser>) => {
      state.registerDataUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.role = null;
      });
  }
});

export const { storeUser, storeIsToQuestionnairePage, storeRegisterDataUser } = userProcess.actions;
