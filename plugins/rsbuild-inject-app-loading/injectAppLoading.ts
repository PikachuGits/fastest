// plugins/injectAppLoading.ts
import fs from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import type { RsbuildPlugin } from '@rsbuild/core';
import fsp from 'fs/promises';

/**
 * 替换模板变量，如 <%= VITE_APP_TITLE %>
 */
function replaceTemplateVars(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/<%=\s*(\w+)\s*%>/g, (_, key) => vars[key] ?? '');
}

/**
 * 读取 loading 的 HTML 模板
 */
async function getLoadingRawByHtmlTemplate(loadingTemplate?: string) {
  let appLoadingPath = join(process.cwd(), loadingTemplate || '');

  if (!loadingTemplate || !fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    appLoadingPath = join(__dirname, './default-loading.html');
  }

  return await fsp.readFile(appLoadingPath, 'utf8');
}

/**
 * Rsbuild 插件：注入 App Loading HTML
 */
export function rsbuildPluginAppLoading(options?: {
  loadingTemplate?: string;
}): RsbuildPlugin {
  return {
    name: 'rsbuild-plugin-app-loading',
    async setup(api) {
      // const config = api.getNormalizedConfig();
      const title = process.env.LOADING_APP_TITLE || '';
      // 确保 title 是字符串类型
      if (typeof title !== 'string') {
        throw new Error('LOADING_APP_TITLE must be a string');
      }

      let loadingHtml = await getLoadingRawByHtmlTemplate(
        options?.loadingTemplate,
      );
      loadingHtml = replaceTemplateVars(loadingHtml, {
        LOADING_APP_TITLE: title,
      });

      api.modifyHTML(html => {
        html = html.replace('</body>', `${loadingHtml}</body>`);
        return html;
      });
    },
  };
}
