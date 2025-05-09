// routes.tsx

import { createBrowserRouter } from '@modern-js/runtime/router';
import React, { lazy, Suspense } from 'react';
import Root from './layouts/Root/layout';
// import Home from './pages/Home';
// import About from '@/pages/About';

// export const lazyRouteComponent = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => (
//   React.createElement(importFn)
// );
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true, // 默认子路由
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
