import { defineConfig } from 'vitest/config'
import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';
export default defineConfig({
  plugins: [react(), tsconfigPaths()] as PluginOption[],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname,'./src/setupTest.ts')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: ['src/test/**/*.test.{js,ts,jsx,tsx}'],
      exclude: ['**/*.d.ts', 'src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
})
