// const path = require('path');
// const jestConfig = require('./tests/.eslintrc.js');

module.exports = {
  root: true,
  extends: [
    // https://github.com/airbnb/javascript/blob/master/README.md#airbnb-javascript-style-guide-
    'airbnb-base',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/essential',
    'plugin:jest/recommended',
    'plugin:testcafe/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'webpack': 'webpack.config.js',
    },
  },
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  // https://eslint.org/docs/user-guide/configuring#specifying-globals
  globals: {
    process: true,
  },
  // https://eslint.org/docs/user-guide/configuring#extending-configuration-files

  // https://eslint.org/docs/user-guide/configuring#configuring-plugins
  plugins: [
    'vue', // required to lint *.vue files
    'jest',
    'testcafe',
  ],
  // add your custom rules here
  rules: {
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    // for vuex modules
    'no-shadow': ['error', {
      allow: ['state'],
    }],
    // 'jest/prefer-to-be-null': 'error',
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'import/core-modules': ['vue'],
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'no-mixed-operators': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'jest/no-identical-title': "error",
    'jest/no-jest-import': "error",
    'jest/prefer-to-be-null': "warn",
    'jest/prefer-to-be-undefined': "warn",
    'jest/prefer-to-have-length': "warn",
    'no-return-await': process.env.NODE_ENV === 'e2e' ? 'off': 'error',
  },
  "overrides": [{
    "files": ["*.vue"],
    "rules": {
      'max-len':0
    },
  }],
};
