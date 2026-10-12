import { defineConfig } from 'astro/config';

// 本番ドメイン（Cloudflare Pages に載せるときも同じ）
export default defineConfig({
  site: 'https://chrisbakery.jp',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
