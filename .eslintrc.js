module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'object-curly-newline': ['error', { consistent: true }],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'after'],
  },
  plugins: ['jest'],
}
