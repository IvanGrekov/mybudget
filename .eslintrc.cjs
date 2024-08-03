module.exports = {
    root: true,
    env: { browser: true, es2022: true },
    plugins: ['import', 'promise'],
    extends: [
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['./tsconfig.json'],
            },
        },
    },
    rules: {
        'react/display-name': 'error',
        'no-console':
            process.env.NODE_ENV === 'production'
                ? ['error', { allow: ['warn', 'error'] }]
                : ['warn', { allow: ['warn', 'error', 'log'] }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any':
            process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'promise/no-nesting': 'error',
        'promise/no-callback-in-promise': 'error',
        'no-extra-boolean-cast': 'error',
        'no-useless-return': 'error',
        curly: ['error', 'all'],
        'newline-before-return': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'linebreak-style': ['error', 'unix'],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                pathGroups: [
                    {
                        pattern: 'react*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react*/**',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: false,
                },
                'newlines-between': 'always',
            },
        ],
        'react/prop-types': 'error',
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'react/no-unused-prop-types': 'error',
        'prefer-template': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        'prettier/prettier': [
            2,
            {
                semi: true,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 80,
                tabWidth: 4,
            },
        ],
    },
};
