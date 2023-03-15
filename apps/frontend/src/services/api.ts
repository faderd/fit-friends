import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { config } from 'process';

const STATUS_CODES_MAPPING: Set<StatusCodes> = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.NOT_FOUND,
]);

const shouldDisplayError = (response: AxiosResponse) => STATUS_CODES_MAPPING.has(response.status);

const BACKEND_URL = 'http://localhost:4200/api/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.url === 'auth/refresh') {
        const token = 'Bearer '.concat(getRefreshToken());

        if (token) {
          config.headers['Authorization'] = token;
        }
        return config;
      }

      const token = 'Bearer '.concat(getAccessToken());
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === StatusCodes.UNAUTHORIZED && error.config && !error.config._isRetry) {
        console.log('error.config._isRetry: ', error.config._isRetry);
        originalRequest._isRetry = true;
        console.log('error.config._isRetry: ', error.config._isRetry);
        console.log('refresh api started');
        // const { data } = await api.post<{ access_token: string, refresh_token: string }>('auth/refresh');
        const { data } = await axios.post<{ access_token: string, refresh_token: string }>(`${BACKEND_URL}auth/refresh`);
        console.log('getted tokens: ', data);
        saveAccessToken(data.access_token);
        saveRefreshToken(data.refresh_token);

        return api.request(originalRequest);
      }

      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
