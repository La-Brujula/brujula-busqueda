import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './i18n.ts';

import QueryProvider from './shared/providers/queryProvider.tsx';
import { UserProvider } from './shared/providers/authProvider.tsx';
import App from './App.tsx';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryProvider>
    </StrictMode>
  );
}
