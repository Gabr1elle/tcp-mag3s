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
	nitro: {
    experimental: {
      websocket: true,
    },
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
		// Vimeo Api
		clientId: "",
    clientSecret: "",
    accessToken: "",
	},

	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
		'@nuxt/ui',
		'vue3-carousel-nuxt',
		'@formkit/auto-animate/nuxt',
		'nuxt3-meta-pixel',
	],

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
		dirs: ['.stores'],
	},

	pinia: {
		autoImports: ['defineStore'],
	},

	css: ['animate.css/animate.min.css', '~/assets/css/main.css'],
});
