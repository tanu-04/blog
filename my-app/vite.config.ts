import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()] as any[], // Cast to any[] to silence typings errors
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8', // or 'istanbul' if preferred
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: ['src/test/**/*.test.{js,ts,jsx,tsx}'],
      exclude: ['**/*.d.ts', 'src/main.tsx', 'src/vite-env.d.ts'],
  
    },
  },
})
