module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.eslint.json',
        sourceType: 'module'
    },
    plugins: [
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-import',
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: {
                        message: 'Avoid using the `Object` type. Did you mean `object`?'
                    },
                    Function: {
                        message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
                    },
                    Boolean: {
                        message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
                    },
                    Number: {
                        message: 'Avoid using the `Number` type. Did you mean `number`?'
                    },
                    String: {
                        message: 'Avoid using the `String` type. Did you mean `string`?'
                    },
                    Symbol: {
                        message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
                    }
                }
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'off',
            {
                accessibility: 'explicit'
            }
        ],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': [
            'off',
            {
                ignoreParameters: true
            }
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                hoist: 'all'
            }
        ],
        '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                path: 'always',
                types: 'prefer-import',
                lib: 'always'
            }
        ],
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'off',
        'arrow-parens': ['off', 'always'],
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                exports: 'never',
                functions: 'never',
                imports: 'never',
                objects: 'never'
            }
        ],
        complexity: 'off',
        'constructor-super': 'error',
        'dot-notation': 'off',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-denylist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'import/order': 'off',
        indent: 'off',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'off',
        'jsdoc/newline-after-description': 'off',
        'jsdoc/no-types': 'error',
        'max-classes-per-file': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignorePattern: '\\sfrom.*$',
                ignoreUrls: true
            }
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'off',
        'no-console': [
            'error',
            {
            allow: [
                'log',
                'warn',
                'dir',
                'timeLog',
                'time',
                'timeEnd',
                'assert',
                'clear',
                'count',
                'countReset',
                'group',
                'groupEnd',
                'table',
                'dirxml',
                'error',
                'groupCollapsed',
                'Console',
                'profile',
                'profileEnd',
                'timeStamp',
                'context'
            ]
            }
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-empty-function': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': 'off',
        'no-new-wrappers': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
        'no-unused-labels': 'error',
        'no-use-before-define': 'off',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'prefer-const': 'error',
        'quote-props': ['error', 'as-needed'],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        radix: 'error',
        semi: 'error',
        'space-before-function-paren': 'off',
        'space-in-parens': ['error', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/']
            }
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off'
    }
};