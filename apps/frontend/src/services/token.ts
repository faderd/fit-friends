const ACCESS_TOKEN_KEY_NAME = 'fit-friends-access_token';
const REFRESH_TOKEN_KEY_NAME = 'fit-friends-refresh_token';

export type Token = string;

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};
export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveAccessToken = (token: Token): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};
export const saveRefreshToken = (token: Token): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const dropAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};
export const dropRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
