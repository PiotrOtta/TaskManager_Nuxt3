// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Task Manager by Piotr Otta',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Task Manager by Piotr Otta',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: 'favicon.ico',
                },
            ],
        },
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    css: ['~/assets/styles/globalStyle.css'],
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/tailwindcss',
        '@element-plus/nuxt',
        '@vueuse/nuxt',
        'nuxt-svgo',
        '@pinia/nuxt',
    ],
    eslint: {
        checker: true,
        config: {
            typescript: true,
            autoInit: true,
            stylistic: {
                braceStyle: '1tbs',
                indent: 4,
                quotes: 'single',
                semi: true,
                arrowParens: true,
            },
        },
    },
    elementPlus: {
        themes: ['dark'],
        importStyle: 'css',
    },
    runtimeConfig: {
        public: {
            baseURL: '127.0.0.1:3000',
        },
    },
});
