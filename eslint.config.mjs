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

export default defineConfig([
  globalIgnores([
    '**/dist/**/*',
    '**/coverage/**/*',
    'node_modules/**/*',
    '**/node_modules/**/*',
    '**/plugins/**/*',
    '**/.webpack/**/*',
    '**/.angular/**/*',
    '**/out/**/*',
    './*.ts',
    './eslint.config.mjs',
    'scripts/**/*',
  ]),
  {
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

    languageOptions: {
      globals: {
        ...browserGlobals,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: true,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: 'workspaces/*/tsconfig.json',
        },
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
]);
