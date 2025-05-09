import { appTools, defineConfig } from '@modern-js/app-tools';
import { routerPlugin } from '@modern-js/plugin-router-v7';
import { rsbuildPluginAppLoading } from './plugins/rsbuild-inject-app-loading/injectAppLoading';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  source: {
    preEntry: './src/global.css',
  },
  builderPlugins: [rsbuildPluginAppLoading()],
  // 构建工具插件
  plugins: [
    routerPlugin(),
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
});
