// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: false,
    },
    modules: [
        '@formkit/auto-animate',
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        '@vueuse/nuxt',
        'vuetify-nuxt-module',
    ],
    ssr: false,
})
