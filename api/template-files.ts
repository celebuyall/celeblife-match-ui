import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '..', 'src', 'templates', 'food');

export function readTemplateFile(relativePath: string): string {
  return fs.readFileSync(path.join(TEMPLATES_DIR, relativePath), 'utf-8');
}

const PACKAGE_NAMES: Record<string, string> = {
  '뷰티': 'celebeauty-report',
  '푸드': 'celebfood-report',
};

export function getTemplatePackageJSON(category: string = '푸드'): string {
  return JSON.stringify({
    name: PACKAGE_NAMES[category] || 'celebfood-report',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      'lucide-react': '^0.563.0',
      'react': '^19.2.0',
      'react-dom': '^19.2.0',
      'recharts': '^3.7.0',
    },
    devDependencies: {
      '@tailwindcss/vite': '^4.1.18',
      '@types/react': '^19.2.5',
      '@types/react-dom': '^19.2.3',
      '@vitejs/plugin-react': '^5.1.1',
      'tailwindcss': '^4.1.18',
      'typescript': '~5.9.3',
      'vite': '^7.2.4',
    },
  }, null, 2);
}

export const TEMPLATE_VITE_CONFIG = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;

export const TEMPLATE_TSCONFIG = JSON.stringify({
  compilerOptions: {
    target: 'ES2020',
    useDefineForClassFields: true,
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: 'force',
    noEmit: true,
    jsx: 'react-jsx',
    strict: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true,
    noUncheckedSideEffectImports: true,
  },
  include: ['src'],
}, null, 2);

export const TEMPLATE_VITE_ENV = `/// <reference types="vite/client" />
`;

export const TEMPLATE_MAIN_TSX = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`;

const PAGE_TITLES: Record<string, string> = {
  '뷰티': 'Celebeauty Report',
  '푸드': 'Celebfood Report',
};

export function getTemplateIndexHTML(category: string = '푸드'): string {
  const title = PAGE_TITLES[category] || 'Celebfood Report';
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
    <link href="https://fonts.cdnfonts.com/css/caviar-dreams" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

export function getTemplateIndexCSS(): string {
  return `@import "tailwindcss";

@theme {
  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  --font-logo: 'Caviar Dreams', sans-serif;

  --color-olive-50: #f7f7f0;
  --color-olive-100: #eeefdc;
  --color-olive-200: #dde0b9;
  --color-olive-300: #c5c88d;
  --color-olive-400: #a4a75f;
  --color-olive-500: #7c7d35;
  --color-olive-600: #636529;
  --color-olive-700: #4d4e20;
  --color-olive-800: #3d3e1a;
  --color-olive-900: #2d2e14;

  --color-slate-850: #151f32;
}

body {
  font-family: var(--font-sans);
  background-color: #F8FAFC;
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}`;
}
