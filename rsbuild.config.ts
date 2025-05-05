import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': './src', // 设置 @ 指向 src 目录
    },
  },
  plugins: [pluginReact()],
});
