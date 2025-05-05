import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouterFromUserConfig } from './router';
import { getUserLayout } from './layout';

const router = createRouterFromUserConfig();
const Layout = getUserLayout();

const App = () => (
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);

export function bootstrap() {
  const container = document.getElementById('root');
  if (!container) throw new Error('Missing #root container');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

