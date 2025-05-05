import * as React from 'react';

type LayoutComponent = React.FC<{ children: React.ReactNode }>;

const DefaultLayout: LayoutComponent = ({ children }) => <>{children}</>;

// 支持扫描 layouts 目录下的所有布局文件
const cachedLayouts = (() => {
  try {
    // 方案1：Webpack 环境 (require.context)
    if (typeof require.context === 'function') {
      const context = require.context('@/layouts/', true, /\.tsx$/);
      const layouts: Record<string, LayoutComponent> = {};

      context.keys().forEach((key) => {
        const name = key.replace(/^\.\/(.*)\.tsx$/, '$1');
        layouts[name] = context(key).default || DefaultLayout;
      });

      return {
        get: (name = 'default') => layouts[name] || DefaultLayout,
        list: () => Object.keys(layouts)
      };
    }

    // 方案2：Vite/Rsbuild 环境 (import.meta.glob)
    if (import.meta.glob) {
      const modules = import.meta.glob('@/layouts/*.tsx', { eager: true }) as Record<
        string,
        { default: LayoutComponent }
      >;

      const layouts: Record<string, LayoutComponent> = {};
      Object.entries(modules).forEach(([path, mod]) => {
        const name = path.replace(/^.*\/(.*)\.tsx$/, '$1');
        layouts[name] = mod.default;
      });

      return {
        get: (name = 'default') => layouts[name] || DefaultLayout,
        list: () => Object.keys(layouts)
      };
    }

    // 兜底返回默认布局
    return {
      get: () => DefaultLayout,
      list: () => ['default']
    };
  } catch (error) {
    console.warn('[Layout] Failed to load layouts:', error);
    return {
      get: () => DefaultLayout,
      list: () => ['default']
    };
  }
})();

// 对外暴露的API
export const getLayout = (name?: string) => cachedLayouts.get(name);
export const listLayouts = () => cachedLayouts.list();