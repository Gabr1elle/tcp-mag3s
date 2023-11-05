// https://nuxt.com/docs/api/configuration/nuxt-config
const typeMediaDefault = [
	'text',
	'link',
	'color',
	'archive',
	'icon',
	'datetime',
	'boolean',
];

export default defineNuxtConfig({
	ui: {
		global: true,
		icons: ['material-symbols'],
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

		public: {
			typesMedia: typeMediaDefault,
			pathAssets: '',
		},
	},

	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
		'@nuxt/ui',
		'vue3-carousel-nuxt',
		'@formkit/auto-animate/nuxt',
	],

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

	css: ['~/assets/css/main.css', 'animate.css/animate.min.css'],
});
