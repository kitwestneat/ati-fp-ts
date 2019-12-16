module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        'react-app',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'import'],
    root: true,
    rules: {
        'import/order': ['error', { alphabetize: { order: "asc"} }],
        'array-callback-return': 'warn',
        'default-case': 'warn',
        'dot-location': ['warn', 'property'],
        eqeqeq: ['warn', 'smart'],
        'new-parens': 'off',
        'no-array-constructor': 'warn',
        'no-caller': 'warn',
        'no-cond-assign': 'warn',
        'no-const-assign': 'warn',
        'no-control-regex': 'warn',
        'no-delete-var': 'warn',
        'no-dupe-args': 'warn',
        'no-dupe-class-members': 'warn',
        'no-dupe-keys': 'warn',
        'no-duplicate-case': 'warn',
        'no-empty-character-class': 'warn',
        'no-empty-pattern': 'warn',
        'no-eval': 'warn',
        'no-ex-assign': 'warn',
        'no-extend-native': 'warn',
        'no-extra-bind': 'warn',
        'no-extra-label': 'warn',
        'no-fallthrough': 'warn',
        'no-func-assign': 'warn',
        'no-implied-eval': 'warn',
        'no-invalid-regexp': 'warn',
        'no-iterator': 'warn',
        'no-label-var': 'warn',
        'no-labels': [
            'warn',
            {
                allowLoop: true,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 'warn',
        'no-loop-func': 'warn',
        'no-mixed-operators': [
            'warn',
            {
                groups: [
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof']
                ],
                allowSamePrecedence: false
            }
        ],
        'no-multi-str': 'warn',
        'no-native-reassign': 'warn',
        'no-negated-in-lhs': 'warn',
        'no-new-func': 'warn',
        'no-new-object': 'warn',
        'no-new-symbol': 'warn',
        'no-new-wrappers': 'warn',
        'no-obj-calls': 'warn',
        'no-octal': 'warn',
        'no-octal-escape': 'warn',
        'no-redeclare': 'warn',
        'no-regex-spaces': 'warn',
        'no-restricted-syntax': ['warn', 'WithStatement'],
        'no-script-url': 'warn',
        'no-self-assign': 'warn',
        'no-self-compare': 'warn',
        'no-sequences': 'warn',
        'no-shadow-restricted-names': 'warn',
        'no-sparse-arrays': 'warn',
        'no-template-curly-in-string': 'warn',
        'no-this-before-super': 'warn',
        'no-throw-literal': 'warn',
        'no-undef': 'error',
        'no-restricted-globals': [
            'error',
            'addEventListener',
            'blur',
            'close',
            'closed',
            'confirm',
            'defaultStatus',
            'defaultstatus',
            'event',
            'external',
            'find',
            'focus',
            'frameElement',
            'frames',
            'history',
            'innerHeight',
            'innerWidth',
            'length',
            'location',
            'locationbar',
            'menubar',
            'moveBy',
            'moveTo',
            'name',
            'onblur',
            'onerror',
            'onfocus',
            'onload',
            'onresize',
            'onunload',
            'open',
            'opener',
            'opera',
            'outerHeight',
            'outerWidth',
            'pageXOffset',
            'pageYOffset',
            'parent',
            'print',
            'removeEventListener',
            'resizeBy',
            'resizeTo',
            'screen',
            'screenLeft',
            'screenTop',
            'screenX',
            'screenY',
            'scroll',
            'scrollbars',
            'scrollBy',
            'scrollTo',
            'scrollX',
            'scrollY',
            'self',
            'status',
            'statusbar',
            'stop',
            'toolbar',
            'top'
        ],
        'no-unexpected-multiline': 'warn',
        'no-unreachable': 'warn',
        'no-unused-expressions': 'warn',
        'no-unused-labels': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                args: 'none',
                ignoreRestSiblings: true
            }
        ],
        'no-use-before-define': [
            'warn',
            {
                functions: false,
                classes: false,
                variables: false
            }
        ],
        'no-useless-computed-key': 'warn',
        'no-useless-concat': 'warn',
        'no-useless-constructor': 'warn',
        'no-useless-escape': 'warn',
        'no-useless-rename': [
            'warn',
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false
            }
        ],
        'no-with': 'warn',
        'no-whitespace-before-property': 'warn',
        'require-yield': 'warn',
        'rest-spread-spacing': ['warn', 'never'],
        strict: ['warn', 'never'],
        'unicode-bom': ['warn', 'never'],
        'use-isnan': 'warn',
        'valid-typeof': 'off',
        'no-restricted-properties': [
            'error',
            {
                object: 'require',
                property: 'ensure',
                message:
                    'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting'
            },
            {
                object: 'System',
                property: 'import',
                message:
                    'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting'
            }
        ],
        'getter-return': 'warn',
        'import/first': 'error',
        'import/no-amd': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'react/forbid-foreign-prop-types': [
            'warn',
            {
                allowInPropTypes: true
            }
        ],
        'react/jsx-no-comment-textnodes': 'warn',
        'react/jsx-no-duplicate-props': [
            'warn',
            {
                ignoreCase: true
            }
        ],
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-no-undef': 'error',
        'react/jsx-pascal-case': [
            'warn',
            {
                allowAllCaps: true,
                ignore: []
            }
        ],
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-danger-with-children': 'warn',
        'react/no-direct-mutation-state': 'warn',
        'react/no-is-mounted': 'warn',
        'react/no-typos': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/require-render-return': 'error',
        'react/style-prop-object': 'warn',
        'jsx-a11y/accessible-emoji': 'warn',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                aspects: ['noHref', 'invalidHref']
            }
        ],
        'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/heading-has-content': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/img-redundant-alt': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/no-distracting-elements': 'warn',
        'jsx-a11y/no-redundant-roles': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/scope': 'warn',
        'flowtype/define-flow-type': 'warn',
        'flowtype/require-valid-file-annotation': 'warn',
        'flowtype/use-flow-type': 'warn',
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/array-type': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/class-name-casing': 'warn',
        '@typescript-eslint/consistent-type-assertions': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'warn',
        '@typescript-eslint/explicit-member-accessibility': [
            'warn',
            {
                accessibility: 'explicit'
            }
        ],
        '@typescript-eslint/indent': [
            'warn',
            2,
            {
                CallExpression: {
                    arguments: 'first'
                },
                FunctionDeclaration: {
                    parameters: 'first'
                },
                FunctionExpression: {
                    parameters: 'first'
                }
            }
        ],
        '@typescript-eslint/interface-name-prefix': 'warn',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'warn',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-declare': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-namespace-keyword': 'warn',
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/semi': ['warn', 'always'],
        '@typescript-eslint/space-within-parens': ['off', 'never'],
        '@typescript-eslint/triple-slash-reference': 'warn',
        '@typescript-eslint/type-annotation-spacing': 'warn',
        '@typescript-eslint/unified-signatures': 'warn',
        'arrow-body-style': 'warn',
        'arrow-parens': ['off', 'as-needed'],
        camelcase: 'warn',
        'capitalized-comments': 'warn',
        'comma-dangle': 'off',
        complexity: [
            'warn',
            {
                max: 20
            }
        ],
        'constructor-super': 'warn',
        curly: 'warn',
        'dot-notation': 'warn',
        'eol-last': 'off',
        'guard-for-in': 'warn',
        'id-blacklist': [
            'warn',
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
        'id-match': 'warn',
        'import/order': 'warn',
        'linebreak-style': 'off',
        'max-classes-per-file': ['warn', 1],
        'max-len': [
            'warn',
            {
                code: 120
            }
        ],
        'newline-per-chained-call': 'off',
        'no-bitwise': 'warn',
        'no-console': 'off',
        'no-debugger': 'off',
        'no-empty': 'warn',
        'no-extra-semi': 'off',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'off',
        'no-multiple-empty-lines': 'warn',
        /*
        "no-shadow": [
            "warn",
            {
                "hoist": "all"
            }
        ],
        */
        'no-trailing-spaces': 'off',
        'no-undef-init': 'warn',
        'no-underscore-dangle': ['off'],
        'no-unsafe-finally': 'warn',
        'no-var': 'warn',
        'object-shorthand': 'warn',
        'one-var': ['warn', 'never'],
        'prefer-const': 'warn',
        'quote-props': 'off',
        radix: 'warn',
        'space-before-function-paren': 'off',
        'spaced-comment': 'warn',
        '@typescript-eslint/tslint/config': [
            'error',
            {
                rules: {
                    'jsdoc-format': true,
                    'jsx-key': true,
                    'jsx-no-bind': true,
                    'jsx-no-string-ref': true,
                    'jsx-self-close': true,
                    'no-reference-import': true,
                    'one-line': [
                        true,
                        'check-catch',
                        'check-else',
                        'check-open-brace',
                        'check-whitespace'
                    ],
                    typedef: [true, 'parameter', 'property-declaration'],
                    whitespace: [
                        true,
                        'check-branch',
                        'check-decl',
                        'check-module',
                        'check-operator',
                        'check-separator',
                        'check-type',
                        'check-typecast'
                    ]
                }
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
