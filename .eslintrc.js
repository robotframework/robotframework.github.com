module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-multiple-template-root': 'off',
    'no-unused-vars': 'warn',
    'space-before-function-paren': ['warn', 'never'],
    'vue/multi-word-component-names': 'off',
    indent: [2, 2]
  }
}
