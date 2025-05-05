import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// 定义路由配置类型
export interface RouteConfig {
  path: string;
  component: string;
}

// 转换路径到组件路径
const pathToComponent = (path: string): string => {
  return path
    .replace(/\/:([^/]+)/g, '/$$$1') // 转换 :param 到 $param
    .replace(/\/\*/g, '/$'); // 转换 /* 到 /$
};

// 懒加载组件
const lazyLoad = (path: string) => {
  return lazy(() => import(`@/${pathToComponent(path)}`));
};

// 转换路由配置到 React Router 路由对象
const createRoute = (config: RouteConfig): RouteObject => {
  return {
    path: config.path,
    Component: lazyLoad(config.component),
  };
};

// 从配置创建路由
export const createRouter = (configs: RouteConfig[]) => {
  const routes = configs.map(createRoute);
  return createBrowserRouter(routes);
};

// 路由配置示例
export const routerConfig: RouteConfig[] = [
  { path: '/', component: 'pages/index.tsx' },
  // { path: '/foo/:slug', component: '@/pages/foo/$slug.tsx' },
  // { path: '/:bar/*', component: '@/pages/$bar/$.tsx' },
];

// 创建并导出路由实例
export const router = createRouter(routerConfig); 