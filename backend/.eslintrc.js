module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        //'linebreak-style': ['error', 'unix'],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-unused-vars': ['warn'], // Pode mudar para warn para só alertar
        'no-undef': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }], // Permitir catch vazio, por exemplo
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    },
}
