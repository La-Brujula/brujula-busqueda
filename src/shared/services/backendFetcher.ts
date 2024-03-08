import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Meta = {
  total: number;
  limit: number;
  offset: number;
};

export type BackendResponse<T extends any | any[]> = {
  isSuccess: boolean;
  entity: T;
} & (T extends any[]
  ? {
      meta: Meta;
    }
  : {});

const backendRequester = axios.create({
  baseURL: BASE_URL,
});

export async function getFetch<T extends any>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) {
  return backendRequester
    .get(url, config)
    .then((res) => res.data as BackendResponse<T>);
}
export async function postFetch<T extends any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) {
  return backendRequester
    .post(url, data, config)
    .then((res) => res.data as BackendResponse<T>);
}

export async function patchFetch<T extends any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) {
  return backendRequester
    .patch(url, data, config)
    .then((res) => res.data as BackendResponse<T>);
}
