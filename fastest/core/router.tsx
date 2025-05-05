import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { getUserLayout } from './layout';

// 获取用户的 Layout 组件

// 使用 require.context 替代 import.meta.glob
const context = require.context('@/pages', true, /\.tsx$/);  // 确保路径正确

export function createRouterFromUserConfig() {
  // 遍历 pages 目录中的所有 .tsx 文件并生成路由配置
  const routes = context.keys().map((key) => {
    const mod = context(key) as { default: React.FC };

    // 根据文件路径构造路由路径
    const routePath =
      key
        .replace(/^\.\/?/, '')             // 去掉开头的 ./
        .replace(/\/?index\.tsx$/, '/')    // 如果是 index.tsx，代表根路径
        .replace(/\.tsx$/, '')             // 去掉后缀
        .replace(/^pages/, '')             // 去掉 pages 前缀
      || '/';

    return {
      path: routePath,
      element: (
        <>
          {React.createElement(mod.default)}
        </>
      ),
    };
  });

  return createBrowserRouter(routes);
}
