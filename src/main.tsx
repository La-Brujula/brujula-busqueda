import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import './i18n.ts';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import QueryProvider, {
  queryClient,
} from './shared/providers/queryProvider.tsx';

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>
  );
}
