import GlobalLoading from '@/GlobalLoading';
import {
  RouterProvider,
  useNavigation,
  useRoutes,
} from '@modern-js/runtime/router';
import { Suspense, useEffect } from 'react';
import { unmountGlobalLoading } from '../plugins/rsbuild-inject-app-loading/unmount-global-loading';
import { router } from './routes';

export function HydrateFallback() {
  return <GlobalLoading />;
}

const App = () => {
  // const navigation = useNavigation();
  //
  // // 检测当前的加载状态
  // const isLoading = navigation.state === 'loading';
  useEffect(() => {
    // 页面加载完成后执行的代码
    console.log('页面加载完成！');
    unmountGlobalLoading();
    // 你可以在这里执行任何副作用操作，比如获取数据、更新状态等
  }, []); // 空数组表示只在组件挂载时执行一次
  return <RouterProvider router={router} />;
};

export default App;
