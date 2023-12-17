import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'

// TODO: cant get it to import
const matijaoe = (
  options?: OptionsConfig & FlatConfigItem,
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> => antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  unocss: false,
  react: false,
  jsonc: true,
  yaml: false,
  markdown: true,

  typescript: {
    tsconfigPath: 'tsconfig.json',
  },

  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },

  ignores: [
    '**/dist',
    '**/node_modules',
  ],

  overrides: {
    ...options?.overrides,

    javascript: {
      'default-param-last': 'error',
      'no-alert': 'warn',
      'no-await-in-loop': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-nested-ternary': 'error',
      'no-param-reassign': 'warn',
      'no-unused-vars': ['error', { args: 'after-used', caughtErrors: 'none', ignoreRestSiblings: true, vars: 'all' }],
      'no-use-before-define': ['error', { allowNamedExports: false, classes: false, functions: false, variables: true }],

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      ...options?.overrides?.javascript,
    },

    typescript: {
      // Overwritten by ts/* rules below
      'default-param-last': 'off',
      'no-throw-literal': 'off',
      'no-use-before-define': 'off',
      'prefer-destructuring': 'off',

      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/default-param-last': 'error',
      'ts/no-floating-promises': 'error', // check performance
      'ts/naming-convention': [
        'error',
        // TS interface
        {
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          selector: 'interface',
        },
        // TS Type
        {
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          selector: 'typeLike',
        },
        // variables
        {
          format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow',
          selector: 'variable',
          trailingUnderscore: 'allow',
        },
      ],
      'ts/no-explicit-any': 'warn',
      'ts/no-throw-literal': 'error',
      'ts/no-use-before-define': 'off',
      'ts/prefer-as-const': 'error', // TODO: make it work in vue script
      'ts/prefer-destructuring': 'error',
      'ts/prefer-for-of': 'error',
      'ts/prefer-nullish-coalescing': 'error',
      'ts/prefer-ts-expect-error': 'off',

      ...options?.overrides?.typescript,
    },

    // @ts-expect-error: it's complaining about `type-literal` not being a valid option in define-emits-declaration
    vue: {
      'vue/block-lang': ['warn', { script: { lang: 'ts' }, style: { lang: 'postcss' } }],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'vue/comma-dangle': ['error', 'only-multiline'],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-emits-declaration': ['warn', 'type-literal'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/html-button-has-type': 'error',
      'vue/html-self-closing': 'error',
      'vue/max-attributes-per-line': ['error', {
        multiline: { max: 1 },
        singleline: { max: 20 },
      }],
      // 'vue/no-bare-strings-in-template': 'error', // to be used for localization
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'warn',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-restricted-custom-event': ['warn', {
        event: 'input',
        message: 'If you intend a prop for v-model, it should be \'update:modelValue\' in Vue 3.',
        suggest: 'update:modelValue',
      }, {
        event: '/ed$/',
        message: 'Event should be in imperative mood, e.g. \'edit\' instead of \'edited\'.',
      }],
      'vue/no-restricted-html-elements': [
        'error',
        {
          element: 'a',
          message: 'Use <NuxtLink> over <a> for Nuxt applications, or <RouterLink> for Vue apps',
        },
        {
          element: 'marquee',
          message: 'Do not use deprecated HTML tags',
        },
      ],
      'vue/no-root-v-if': 'error',
      'vue/no-setup-props-reactivity-loss': 'error', // set to 'off' when using experimental propsDestructure
      'vue/no-side-effects-in-computed-properties': 'error', // ! does not work
      'vue/no-static-inline-styles': 'warn',
      // 'vue/no-undef-properties': 'error', // useful in js, not needed in ts
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-template-attributes': 'error',
      'vue/no-v-text': 'error',
      'vue/object-curly-newline': ['error', { consistent: true, multiline: true }],
      'vue/padding-line-between-tags': ['error', [{ blankLine: 'never', next: '*', prev: '*' }]],
      'vue/prefer-define-options': 'error',
      'vue/prefer-template': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/return-in-computed-property': ['error', { treatUndefinedAsUnspecified: true }], // ! does not work

      ...options?.overrides?.vue,
    },
  },

  ...options,

  rules: {
    'antfu/top-level-function': 'off',

    'curly': ['error', 'all'],
    // 'max-statements-per-line': 'off', // deprecated, but only it seems to show errors (without running the eslint command)
    'no-negated-condition': 'off',

    // https://eslint.style/
    'style/array-bracket-newline': ['error', 'consistent'],
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/comma-dangle': ['error', 'only-multiline'],
    'style/eol-last': ['error', 'always'],
    'style/max-statements-per-line': ['error', { max: 2 }],

    // https://github.com/sindresorhus/eslint-plugin-unicorn
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': ['error', { name: 'error' }],
    'unicorn/consistent-destructuring': 'error',
    // 'unicorn/consistent-function-scoping': 'error', // don't know if i like this
    'unicorn/empty-brace-spaces': 'error',
    // 'unicorn/explicit-length-check': 'error', // I dont like this
    'unicorn/filename-case': [
      'error',
      // would be nice if we could enforce PascalCase on vue components as well
      {
        case: 'kebabCase',
        ignore: [
          '.vue$',
          '[README].md$',
        ],
      },
    ],
    // 'unicorn/no-array-callback-reference': 'error', // 😑
    'unicorn/new-for-builtins': 'error',
    // 'unicorn/no-array-for-each': 'error', // 😑
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-array-push-push': 'error',
    'unicorn/no-await-expression-member': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-empty-file': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-lonely-if': 'error',
    'unicorn/no-negated-condition': 'error', // * really make sure we want this
    'unicorn/no-null': 'error', // ! controversial
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unreadable-iife': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/no-useless-promise-resolve-reject': 'error',
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-useless-switch-case': 'error',
    // 'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-at': ['error', { checkAllIndexAccess: true }],
    'unicorn/prefer-blob-reading-methods': 'error',
    'unicorn/prefer-code-point': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-dataset': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-export-from': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-math-trunc': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-native-coercion-functions': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-prototype-methods': 'off',
    'unicorn/prefer-query-selector': 'error',
    // 'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-set-size': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    // 'unicorn/prefer-switch': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/prefer-top-level-await': 'error',
    'unicorn/relative-url-style': 'error',
    'unicorn/require-number-to-fixed-digits-argument': 'error',
    'unicorn/switch-case-braces': 'error',
    'unicorn/template-indent': 'error',
    'unicorn/text-encoding-identifier-case': 'error',

    ...options?.rules,
  },
}, userConfigs)

export default matijaoe
