// src/setupTests.ts
import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => null),
      clear: vi.fn(() => null),
      removeItem: vi.fn(() => null),
    },
    writable: true,
  });
});
