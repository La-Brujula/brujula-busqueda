import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useAuth } from './authProvider';
import { AxiosError } from 'axios';
import React from 'react';

const unauthorizedStatuses = [401];

function useGlobalErrors({
  onAuthError = () => {},
  onServerError = () => {},
  onRecover = () => {},
}) {
  const triggerError = (error: Error | AxiosError) => {
    let status = 500;
    if (typeof error === typeof AxiosError) {
      status = (error as AxiosError).response.status;
    }

    if (unauthorizedStatuses.includes(status)) {
      onAuthError();
    } else if (status === 500) {
      onServerError();
    }
  };

  const queryCache = new QueryCache({
    onError(error) {
      if (error) {
        triggerError(error);
      }
    },
    onSuccess() {
      onRecover();
    },
  });

  const mutationCache = new MutationCache({
    onError(error) {
      if (error) {
        triggerError(error);
      }
    },
    onSuccess(data) {
      onRecover();
    },
  });

  return { queryCache, mutationCache };
}

function QueryProvider({ children }: { children: ReactNode }) {
  const { queryCache, mutationCache } = useGlobalErrors({});

  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
    []
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default React.memo(QueryProvider);
