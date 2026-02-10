import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const browserGlobals = {
  ...globals.browser,
  AudioWorkletGlobalScope: false, // this is the default,
};
delete browserGlobals['AudioWorkletGlobalScope '];

const baseConfig = {
  extends: fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:import/recommended',
      'plugin:import/electron',
      'plugin:import/typescript'
    )
  ),

  plugins: {
    import: fixupPluginRules(_import),
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
    import: fixupPluginRules(_import),
  },

  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
};

const baseLanguageOptions = {
  globals: {
    ...browserGlobals,
    ...globals.node,
    ...globals.jest,
  },
  parser: tsParser,
  ecmaVersion: 2022,
  sourceType: 'module',
};

export default defineConfig([
  globalIgnores([
    '**/dist/**/*',
    '**/.dist/**/*',
    '**/coverage/**/*',
    'node_modules/**/*',
    '**/node_modules/**/*',
    '**/plugins/**/*',
    '**/.webpack/**/*',
    '**/.angular/**/*',
    '**/out/**/*',
    './eslint.config.mjs',
    'scripts/**/*',
  ]),
  // Root and electron-app files
  {
    files: ['*.ts', 'workspaces/electron-app/**/*.ts'],
    ...baseConfig,
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        project: ['./tsconfig.json', './workspaces/electron-app/tsconfig.json'],
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          noWarnOnMultipleProjects: true,
          project: [
            './tsconfig.json',
            './workspaces/electron-app/tsconfig.json',
          ],
        },
      },
    },
  },
  // Angular-app files
  {
    files: ['workspaces/angular-app/**/*.ts'],
    ...baseConfig,
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        project: [
          './workspaces/angular-app/tsconfig.app.json',
          './workspaces/angular-app/tsconfig.spec.json',
        ],
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            './workspaces/angular-app/tsconfig.app.json',
            './workspaces/angular-app/tsconfig.spec.json',
          ],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },
  // Shared-lib files
  {
    files: ['workspaces/shared-lib/**/*.ts'],
    ...baseConfig,
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        project: ['./workspaces/shared-lib/tsconfig.json'],
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./workspaces/shared-lib/tsconfig.json'],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },
]);
