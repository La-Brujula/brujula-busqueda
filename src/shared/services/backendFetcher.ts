import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Meta = {
  total: number;
  limit: number;
  offset: number;
};

export type BackendResponse<T extends any | any[]> =
  | ({
      isSuccess: true;
      entity: T;
    } & (T extends any[]
      ? {
          meta: Meta;
        }
      : {}))
  | {
      isSuccess: false;
      error: {
        errorCode: string;
        message: string;
      };
    };

const backendRequester = axios.create({
  baseURL: BASE_URL,
});

backendRequester.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = JSON.parse(localStorage.getItem('jwt'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function getFetch<T extends any>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) {
  const res = await backendRequester
    .get(url, config)
    .then((res) => res.data as BackendResponse<T>);
  if (res.isSuccess === false) throw res.error;
  return res;
}
export async function postFetch<T extends any>(
  url: string,
  data: any = {},
  config?: AxiosRequestConfig<any> | undefined
) {
  const res = await backendRequester
    .post(url, data, config)
    .then((res) => res.data as BackendResponse<T>);
  if (res.isSuccess === false) throw res.error;
  return res;
}

export async function patchFetch<T extends any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) {
  const res = await backendRequester
    .patch(url, data, config)
    .then((res) => res.data as BackendResponse<T>);
  if (res.isSuccess === false) throw res.error;
  return res;
}

export async function deleteFetch<T extends any>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) {
  const res = await backendRequester
    .delete(url, config)
    .then((res) => res.data as BackendResponse<T>);
  if (res.isSuccess === false) throw res.error;
  return res;
}
