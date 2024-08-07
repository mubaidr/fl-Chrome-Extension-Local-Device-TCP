import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    stylistic: false,
    typescript: true,
    vue: true,
    comments: false,
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.worker,
        ...globals.webextensions,
      },
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '**/*.md',
      '**/*.js',
      '**/*.d.ts',
      'public',
      'build',
      'coverage',
      'tests',
      'cypress',
      'src/types/**/*',
    ],
  },
  {
    rules: {
      'no-console': 'warn',
      'no-restricted-globals': 'warn',
      'import/order': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/multi-word-component-names': 'off',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
    },
  }
)
