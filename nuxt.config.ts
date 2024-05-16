// https://nuxt.com/docs/api/configuration/nuxt-config
const typeMediaDefault = [
	'text',
	'link',
	'color',
	'archive',
	'icon',
	'datetime',
	'boolean',
	'json',
];

export default defineNuxtConfig({
	ui: {
		global: true,
		icons: ['material-symbols', 'ic', 'mdi'],
	},

	typescript: {
		shim: false,
	},

	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	runtimeConfig: {
		// DB Conection
		forceDropDb: false,
		forceAlterDb: false,
		nameDb: '',
		userDb: '',
		passDb: '',
		portDb: '',

		// App create User
		rolesType: ['adminmaster', 'admin', 'editor', 'reader'],
		typesMedia: typeMediaDefault,
		adminName: '',
		adminEmail: '',
		adminPass: '',

		// Config Google Cloud Storage
		gcsSubfolder: '',
		gcsSubfolderEnvironment: '',
		gcsBucketname: '',

		// Incentive Campaign API

		public: {
			typesMedia: typeMediaDefault,
			pathAssets: '',

			// Incentive Campaign API Public
			ApiIncentiveClientId: '',
			ApiIncentiveClientSecret: '',
			ApiIncentiveKeyValue: '',
			ApiIncentiveReferral: '',
			ApiIncentiveSystemIdentity: '',
			ApiIncentiveSystemContents: '',
			ApiIncentiveGamification: '',

			// User Auth Login Test Hub
			ApiIncentiveUserTest: '',
			ApiIncentivePassTest: '',
		},
	},

	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
		'@nuxt/ui',
		'vue3-carousel-nuxt',
		'@formkit/auto-animate/nuxt',
		'nuxt3-meta-pixel',
		'@vite-pwa/nuxt',
	],

	pwa: {
		mode: 'development',
		strategies: 'generateSW',
		registerType: 'autoUpdate',
		manifest: {
			name: 'Incentiva',
			short_name: 'Incentiva',
			theme_color: '#FFBE00',
			icons: [
				{
					src: 'pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: 'pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
		workbox: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		client: {
			installPrompt: true,
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},

	facebook: {
		/* module options */
		track: 'PageView',
		autoPageView: true,
		debug: false,
		disabled: true,
	},

	components: [{ path: '~/components/admin', prefix: 'Adm' }, '~/components'],

	colorMode: {
		preference: 'light',
	},

	imports: {
		autoImport: true,
		dirs: ['.stores'],
	},

	pinia: {
		autoImports: ['defineStore'],
	},

	vite: {
		logLevel: 'info',
	},

	css: ['animate.css/animate.min.css', '~/assets/css/main.css'],
});
