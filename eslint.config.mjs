import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    {
        files: ['**/*.vue'],
        rules: {
            'vue/block-order': [
                'error',
                {
                    order: ['template', 'script', 'style'],
                },
            ],
            'vue/max-attributes-per-line': 'off',
            'vue/html-closing-bracket-newline': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/ban-ts-comment': 'off',
            'vue/no-v-html': 'off',
        },
    },
    {
        ignores: ['backend/', 'node_modules'],
    },
);
