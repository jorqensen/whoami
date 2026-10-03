import { version as viteVersion } from 'vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxt/image',
        'motion-v/nuxt'
    ],

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    content: {
        experimental: {
            sqliteConnector: 'bun'
        }
    },

    runtimeConfig: {
        public: {
            siteUrl: 'https://jorqensen.dev',
            viteVersion
        }
    },

    compatibilityDate: '2026-06-30',

    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/', '/writing']
        }
    },

    eslint: {
        config: {
            stylistic: {
                semi: true,
                quotes: 'single',
                indent: 4,
                commaDangle: 'only-multiline',
                braceStyle: '1tbs'
            }
        }
    },

    icon: {
        clientBundle: {
            scan: {
                globInclude: ['app/**/*.{vue,ts,md,yml,yaml}', 'content/**/*.{md,yml,yaml}']
            }
        }
    },

    image: {
        format: ['avif', 'webp'],
        quality: 80
    },
});
