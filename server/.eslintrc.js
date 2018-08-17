// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue','standard'
  ],
  // add your custom rules here
  rules: {
    "indent": 0,
    'no-tabs': 0,
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": 0,
    "no-empty": 2,
    "no-eq-null": 2,
    "no-new": 0,
    "eol-last": 0,
    "no-debugger": 0,
    "no-fallthrough": 0,
    "no-unreachable": 0,
    "object-property-newline": 0,
    "camelcase": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
}
}
//https://blog.csdn.net/helpzp2008/article/details/51507428 eslint的详细规则
