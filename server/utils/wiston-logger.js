import { Admin } from '../models/Admin.model';
import { createLogger, format, transports } from 'winston';
import Transport from 'winston-transport';
class CustomDBTransport extends Transport {
	constructor(opts, shouldLog = true) {
		super(opts);
		// Inicialização personalizada aqui, se necessário
		this.shouldLog = shouldLog;
	}

	log(info, callback) {
		if (!this.shouldLog) {
			// Se shouldLog for false, não processa o log e chama o callback imediatamente
			return callback(null, true);
		}

		setImmediate(() => {
			this.emit('logged', info);
		});

		try {
			Admin.SystemLog.create({
				level: info.level,
				message: info.message,
				timestamp: info.timestamp
			});

			callback(null, true);
		} catch (error) {
			callback(error, false);
		}
	}
}

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
		// Transportes para salvar logs em arquivos
		new transports.File({
			filename: 'logs/info.log',
			level: 'info',
			format: format.combine(
				format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss'
				}),
				format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
			)
		}),
		new transports.File({
			filename: 'logs/error.log',
			level: 'error',
			format: format.combine(
				format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss'
				}),
				format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
			)
		}),
		// Transporte personalizado para salvar logs no banco de dados
		new CustomDBTransport(),

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
