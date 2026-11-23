import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist', 'docs'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,jsx}'],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: { globals: globals.browser, ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/no-multi-comp': ['error', { ignoreStateless: false }],
      'react/prop-types': 'off',
    },
  },
  { files: ['*.config.js'], languageOptions: { globals: globals.node } },
]
