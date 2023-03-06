const ACCESS_TOKEN_KEY_NAME = 'fit-friends-access_token';

export type Token = string;

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);

  return token ?? '';
};

export const saveAccessToken = (token: Token): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const dropAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};
