import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  typescript: {
    strict: false,
    typeCheck: true,
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      domainName: process.env.NUXT_PUBLIC_DOMAIN_NAME,
    },
  },

  // sourcemap: {
  //     server: false,
  //     client: false,
  // },

  css: ['@/assets/scss/styles.scss', 'vue-final-modal/style.css'],

  modules: [
    'nuxt-icons',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/device',
    'nuxt-splide',
    '@sidebase/nuxt-auth',
  ],

  veeValidate: {
    autoImports: true,
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'ru', name: 'Русский', iso: 'ru-RU', file: 'ru.json' },
    ],
    defaultLocale: 'ru',
    // langDir: 'i18n/locales',
    // lazy: true,
    // vueI18n: './i18n.config.ts',
    // detectBrowserLanguage: false,
    // compilation: {
    //   strictMessage: false,
    // },
  },

  auth: {
    isEnabled: true,
    baseURL: (process.env.NUXT_PUBLIC_API_URL || '') + '/api/app',
    provider: {
      type: 'local',
      endpoints: {
        signIn: {
          path: '/auth/login',
        },
        getSession: {
          path: '/personal/user',
        },
      },
      pages: {
        login: '/login',
      },
      token: {
        maxAgeInSeconds: 36000,
      },
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },

  imports: {
    dirs: [resolve('./stores'), '~/store'],
  },

  pinia: {
    storesDirs: ['~/store/**', '#/store/**', '@/store/**'],
  },

  routeRules: {
    '/upload**': { proxy: { to: process.env.NUXT_PUBLIC_API_URL + '/upload**' } },
  },

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    plugins: [
      {
        name: 'vite-plugin-glob-transform',
        transform(code: string, id: string) {
          if (id.includes('nuxt-icons')) {
            return code.replace(/as:\s*['"]raw['"]/g, 'query: "?raw", import: "default"');
          }
          return code;
        },
      },
    ],
  },
});
