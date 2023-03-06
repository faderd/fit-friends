import { AuthorizationStatus } from '../../const';
import { store } from '../store';
import { UserRole } from '@fit-friends/shared-types';

export type AppDispatch = typeof store.dispatch;

export type AppData = {}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  email: string | null,
  name: string | null,
  role: UserRole | null,
}

export type State = ReturnType<typeof store.getState>;
