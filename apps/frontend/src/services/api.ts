import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

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
      const token = 'Bearer '.concat(getAccessToken());

      if (token) {
        config.headers['Authorization'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
