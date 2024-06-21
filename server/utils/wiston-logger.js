import { createLogger, format, transports } from 'winston';

// Configuração do logger
export const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	// Definindo os transportes (locais onde os logs serão salvos)
	transports: [
		// Permitir a visualização dos logs de nível 'info' no console
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.printf(
					info => `${info.timestamp} ${info.level}: ${info.message}`
				)
			)
		})
	],
});
