import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../const';
import { QuestionnaireData } from '../../types/questionnaire-data';
import { RegisterDataUser } from '../../types/register-data-user.dto';
import { UserProcess } from '../../types/state';
import { UserRdo } from '../../types/user-rdo';
import { checkAuth, login, logout } from '../api-actions';

export const getInitialStateUserProcess = (): UserProcess => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  users: [],
  friends: [],
  questionnaire: null,
  lookingForCompanyUsers: [],

  // флаг означает, что первый этап регистрации пройден и можно переходить к опроснику, если нет то страница с опросником недоступна
  isToQuestionnairePage: false,
  registerDataUser: null,
});

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState: getInitialStateUserProcess(),
  reducers: {
    storeUser: (state, action: PayloadAction<UserRdo>) => {
      state.user = action.payload;
    },
    storeUsers: (state, action: PayloadAction<UserRdo[]>) => {
      state.users = action.payload;
    },
    storeFriends: (state, action: PayloadAction<UserRdo[]>) => {
      state.friends = action.payload;
    },
    storeQuestionnaire: (state, action: PayloadAction<QuestionnaireData>) => {
      state.questionnaire = action.payload;
    },
    storeIsToQuestionnairePage: (state, action: PayloadAction<boolean>) => {
      state.isToQuestionnairePage = action.payload;
    },
    storeRegisterDataUser: (state, action: PayloadAction<RegisterDataUser>) => {
      state.registerDataUser = action.payload;
    },
    storeLookingForCompanyUsers: (state, action: PayloadAction<UserRdo[]>) => {
      state.lookingForCompanyUsers = action.payload;
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
        state.user = null;
        state.questionnaire = null;
      });
  }
});

export const { storeUser, storeUsers, storeIsToQuestionnairePage, storeRegisterDataUser, storeQuestionnaire, storeLookingForCompanyUsers, storeFriends } = userProcess.actions;
