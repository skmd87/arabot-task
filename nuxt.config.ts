// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@formkit/auto-animate',
		'@nuxt/eslint',
		'@nuxtjs/i18n',
		'@vueuse/nuxt',
		'vuetify-nuxt-module',
		'@nuxt/fonts',
	],
	ssr: false,
	devtools: {
		enabled: false,
	},
	css: [
		'@/assets/styles/main.scss',
	],
	compatibilityDate: '2024-04-03',
	typescript: {
		typeCheck: true,
		strict: true,
		shim: false, // assuming running volar with takeover mode
	},
	fonts: {
		defaults: {
			weights: ['100', '300', '400', '500', '600', '700', '900'],
		},
	},
	i18n: {
		locales: [
			{
				code: 'en_US',
				shortCode: 'en',
				file: 'en_US.json',
				dir: 'ltr',
			},
			{
				code: 'ar_SA',
				shortCode: 'ar',
				file: 'ar_SA.json',
				dir: 'rtl',
			},
		],
		defaultLocale: 'en_US',
		strategy: 'no_prefix',
	},
	vuetify: {
		vuetifyOptions: {
			theme: {
				defaultTheme: 'light',
				themes: {
					light: {
						colors: {
							background: '#f8f9fa',
							btn: '#797fc2',
							surface2: '#edf2f7',
						},
					},
				},
			},
		},
	},

})
