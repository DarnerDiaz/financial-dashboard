import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      include: ['src/lib/**/*.ts', 'src/services/**/*.ts', 'src/store/**/*.ts'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/__tests__/**',
      ],
      lines: 80,
      functions: 80,
      statements: 80,
      branches: 75,
    },
    include: ['**/__tests__/**/*.test.ts'],
  },
});
