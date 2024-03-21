import { UserType } from '../types/user';
import {
  BackendResponse,
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from './backendFetcher';

export type Account = {
  email: string;
  role: 'user' | 'admin' | 'editor';
  ProfileId: string;
};

export type IAuthResponse = {
  account: Account;
  token: string;
};

export function loginService(
  email: string,
  password: string
): Promise<BackendResponse<IAuthResponse>> {
  return postFetch<IAuthResponse>('/auth/login', { email, password });
}

export function signUpService(email: string, password: string, type: UserType) {
  return postFetch<IAuthResponse>('/auth/signup', { email, password, type });
}

export function meService() {
  return getFetch<Account>('/auth/me');
}

export function deleteMeService() {
  return deleteFetch<undefined>('/auth/me');
}

export function resetPasswordService(email: string) {
  return postFetch<undefined>('/auth/resetPassword', { email });
}

export function changePasswordService(
  email: string,
  code: string,
  password: string
) {
  return patchFetch<Account>('/auth/resetPassword', {
    email,
    code,
    password,
  });
}
