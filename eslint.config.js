import antfu from '@antfu/eslint-config'

// https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1
// https://github.com/azat-io/eslint-plugin-perfectionist

// use this comment to sort the object manually
// /* eslint perfectionist/sort-objects: "error" */
export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  vue: true,
  unocss: false,
  react: false,
  jsonc: false,
  yaml: false,

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
    javascript: {
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
    },

    typescript: {
      'default-param-last': 'error',
      'no-throw-literal': 'error',
      'no-use-before-define': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
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
      'ts/no-use-before-define': 'off',
      'ts/prefer-as-const': 'error', // TODO: make it work in vue script
      'ts/prefer-nullish-coalescing': 'error',
      'ts/prefer-ts-expect-error': 'off',

      // eslint dies
      // 'prefer-destructuring': 'off',
      // 'ts/prefer-destructuring': 'error',
      // 'ts/prefer-for-of': 'error',
    },

    vue: {
      // TODO
      'vue/attributes-order': ['error', {
        alphabetical: false,
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'CONTENT',
          'EVENTS',
        ]
      }],
      'vue/block-lang': ['warn', {
        script: {
          lang: 'ts'
        },
        style: {
          lang: 'postcss'
        },
      }],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'vue/comma-dangle': ['error', 'only-multiline'],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['warn', 'type-literal'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/first-attribute-linebreak': ['error', {
        // this is the default
        multiline: 'below',
        singleline: 'ignore',
      }],
      'vue/html-button-has-type': 'error',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': ['error', {
        multiline: { max: 1 },
        singleline: { max: 20 },
      }],
      'vue/no-bare-strings-in-template': 'off', // to be used for localization
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'warn',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-restricted-custom-event': ['warn', {
        event: 'input',
        message: 'If you intend a prop for v-model, it should be \'update:modelValue\' in Vue 3.',
        suggest: 'update:modelValue'
      }, {
        event: '/ed$/',
        message: 'Event should be in imperative mood, e.g. \'edit\' instead of \'edited\'.',
      }],
      'vue/no-restricted-html-elements': [
        'error',
        {
          element: 'a',
          message: 'Use <NuxtLink> over <a> for Nuxt applications, or <RouterLink> for Vue apps'
        },
        {
          element: 'marquee',
          message: 'Do not use deprecated HTML tags'
        }
      ],
      'vue/no-root-v-if': 'error',
      'vue/no-setup-props-reactivity-loss': 'error', // set to 'off' if using experimental propsDestructure
      'vue/no-side-effects-in-computed-properties': 'error', // ! does not work
      'vue/no-static-inline-styles': 'warn',
      'vue/no-undef-properties': 'error', // useful when using js, not needed in ts
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-template-attributes': 'error',
      'vue/no-v-text': 'error',
      'vue/object-curly-newline': ['error', { consistent: true, multiline: true }],
      'vue/padding-line-between-tags': ['error', [{ blankLine: 'never', next: '*', prev: '*' }]],
      'vue/prefer-define-options': 'error',
      'vue/prefer-template': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/return-in-computed-property': ['error', { treatUndefinedAsUnspecified: true }], // ! does not work
    },
  },

  rules: {
    'antfu/top-level-function': 'off',

    'curly': ['error', 'all'],

    'style/array-bracket-newline': ['error', 'consistent'],
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/comma-dangle': ['error', 'only-multiline'],
    'style/eol-last': ['error', 'always'],
    'style/max-statements-per-line': ['error', { max: 2 }],
  },

})
