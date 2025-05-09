# injectAppLoading 插件

这是一个Modern.js应用插件，用于在应用加载过程中显示一个加载界面，类似于`vite-plugin-inject-app-loading`的功能。

## 功能特点

- 在应用初始加载过程中显示一个全屏加载提示
- 支持自定义加载提示的样式和内容
- 应用加载完成后自动淡出并移除加载提示
- 支持自定义加载动画和文字
- 支持自定义HTML内容

## 使用方法

1. 在`modern.config.ts`中导入并使用该插件：

```typescript
import { appTools, defineConfig } from '@modern-js/app-tools';
import injectAppLoadingPlugin from './plugins/injectAppLoading';

export default defineConfig({
  // 其他配置...
  plugins: [
    // 其他插件...
    injectAppLoadingPlugin(),
  ]
});
```

## 配置选项

插件接受以下配置选项：

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string` | `'app-loading'` | 加载元素的ID |
| `text` | `string` | `'加载中...'` | 加载提示文字 |
| `backgroundColor` | `string` | `'rgba(0, 0, 0, 0.5)'` | 背景颜色 |
| `textColor` | `string` | `'#fff'` | 文字颜色 |
| `fontSize` | `string` | `'24px'` | 文字大小 |
| `zIndex` | `number` | `9999` | CSS z-index值 |
| `spinnerColor` | `string` | `'#fff'` | 加载动画颜色 |
| `showSpinner` | `boolean` | `true` | 是否显示加载动画 |
| `customHTML` | `string` | `undefined` | 自定义HTML内容，设置后将替换默认加载界面 |
| `duration` | `number` | `0` | 页面加载完成后，延迟多少毫秒开始淡出动画 |
| `fadeOutTime` | `number` | `300` | 淡出动画持续时间（毫秒） |

## 配置示例

### 基本使用

```typescript
injectAppLoadingPlugin()
```

### 自定义样式

```typescript
injectAppLoadingPlugin({
  text: '正在加载应用...',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  textColor: '#ffffff',
  spinnerColor: '#4a90e2',
  fontSize: '18px',
  fadeOutTime: 500,
  duration: 300,
})
```

### 自定义HTML

```typescript
injectAppLoadingPlugin({
  customHTML: `
    <div id="my-custom-loading" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #f0f0f0; display: flex; justify-content: center; align-items: center;">
      <div>
        <img src="/logo.png" width="100" />
        <p>加载中，请稍候...</p>
      </div>
    </div>
  `,
  id: 'my-custom-loading'
})
```

## 注意事项

- 如果提供了`customHTML`选项，其他样式选项将被忽略
- 确保在`customHTML`中使用的资源（如图片）可以在应用加载过程中被访问
