import GlobalLoading from '@/GlobalLoading';
import { router } from '@/routes';
import { Outlet, RouterProvider } from '@modern-js/runtime/router';
import { Suspense } from 'react';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
