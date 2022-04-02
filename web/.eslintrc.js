module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    // Use @typescript-eslint/no-unused-vars for typescript:
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 4 },
      multiline: { max: 4 },
    }],
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    // Disable no-undef rule for TypeScript:
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
        'func-call-spacing': 'off', // Fix for 'defineEmits'
      },
    },
  ],
}
