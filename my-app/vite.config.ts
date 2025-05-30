import { defineConfig } from 'vitest/config'
import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()] as PluginOption[],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: ['src/test/**/*.test.{js,ts,jsx,tsx}'],
      exclude: ['**/*.d.ts', 'src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
})
