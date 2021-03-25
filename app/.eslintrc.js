module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [
      'warn',
      'single',
    ],
    'comma-dangle': [
      'warn',
      'always-multiline',
    ],
    semi: [
      'warn',
      'always',
      { omitLastInOneLineBlock: true },
    ],
    'space-before-function-paren': [
      'warn',
      'never',
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
