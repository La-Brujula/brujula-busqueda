import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';
import { ReactNode } from 'react';

const unauthorizedStatuses = [403];

function useGlobalErrors({
  onAuthError = () => {},
  onServerError = () => {},
  onRecover = () => {},
}) {
  const triggerError = (error: any) => {
    const { status } = error;

    if (unauthorizedStatuses.includes(status)) {
      onAuthError();
    } else if (status === 500) {
      // If it's an unexpected error (i.e. API is down)
      // execute the provided callback
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
    onSuccess() {
      onRecover();
    },
  });

  return [queryCache, mutationCache];
}

export default function QueryProvider({ children }: {children: ReactNode}) {
  const [queryCache, mutationCache] = useGlobalErrors({
    onAuthError: () => {
    },
    onServerError: () => {
    },
  }) as [QueryCache, MutationCache];

  // Create a client
  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
