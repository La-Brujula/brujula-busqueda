import { lazy, useMemo } from 'react';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { LoadingSpinner } from './shared/components/loadingSpinner.tsx';
import React from 'react';

const ErrorHandler = lazy(() => import('./shared/navigation/errorHandler.tsx'));

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: null,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: ErrorHandler,
  defaultPendingComponent: LoadingSpinner,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const queryClient = useQueryClient();
  const context = useMemo(() => ({ queryClient }), [queryClient]);
  return (
    <RouterProvider
      router={router}
      context={context}
    />
  );
}

export default React.memo(App);
