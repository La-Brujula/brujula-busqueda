import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Account,
  IAuthResponse,
  loginService,
  resetPasswordService,
  signUpService,
} from '../services/authServices';
import { UserType } from '../types/user';

import { createContext, useContextSelector } from 'use-context-selector';

interface IAuthContext {
  account: Account | null;
  token: string | null;
  login: (email: string, password: string) => Promise<IAuthResponse>;
  logout: () => Promise<any>;
  signup: (
    email: string,
    password: string,
    type: UserType
  ) => Promise<IAuthResponse>;
  isLoggedIn: boolean;
  resetUserPassword: (email: string) => Promise<IAuthResponse>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function UserProvider(props: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(
    JSON.parse(localStorage.getItem('account') || '{}') as Account
  );
  const [token, setToken] = useState<string | null>(
    JSON.parse(localStorage.getItem('jwt')) || ''
  );

  const login = useCallback(
    async (email: string, password: string): Promise<IAuthResponse> => {
      const res = await loginService(email, password);
      if (res.isSuccess === false) {
        throw res.error.message;
      }
      setAccount(res.entity.account);
      setToken(res.entity.token);
      return res.entity;
    },
    [setAccount, setToken]
  );

  const signup = useCallback(
    async (
      email: string,
      password: string,
      type: 'moral' | 'fisica'
    ): Promise<IAuthResponse> => {
      const res = await signUpService(email, password, type);
      setAccount(res.entity.account);
      setToken(res.entity.token);
      return res.entity;
    },
    [setAccount, setToken]
  );

  const logout = useCallback(async (): Promise<any> => {
    setAccount(null);
    setToken(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('account');
  }, [setAccount, setToken]);

  useEffect(() => {
    if (!account) return;
    localStorage.setItem('account', JSON.stringify(account));
  }, [account]);
  useEffect(() => {
    if (!token) return;
    localStorage.setItem('jwt', JSON.stringify(token));
  }, [token]);

  const isLoggedIn = token?.length > 0;

  const resetUserPassword = useCallback(async (email: string) => {
    const res = await resetPasswordService(email);
    return res.entity;
  }, []);

  const providerValue = useMemo(
    () => ({
      account,
      token,
      login,
      logout,
      signup,
      isLoggedIn,
      resetUserPassword,
    }),
    [account, token, login, logout, signup, isLoggedIn, resetUserPassword]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth(propertyList: (keyof IAuthContext)[]): IAuthContext {
  return useContextSelector(AuthContext, (v) =>
    Object.fromEntries(
      Object.entries(v).filter(([k, _]) =>
        propertyList.includes(k as keyof IAuthContext)
      )
    )
  ) as IAuthContext;
}
