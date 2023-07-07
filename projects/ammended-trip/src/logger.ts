import { Logger, createLogger, format, transports } from 'winston';
import config from './config';

function createHumanReadableLogger(): Logger {
    return createLogger({
        transports: [
            new transports.Console({
                level: 'debug',
                format: format.combine(
                    format.colorize(),
                    format.timestamp(),
                    format.align(),
                    format.printf((info) => {
                        const { timestamp, level, message, ...args } = info;

                        const ts = timestamp.slice(0, 19).replace('T', ' ');
                        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                    }),
                ),
            }),
        ],
    });
}

function createJSONLogger(): Logger {
    return createLogger({
        transports: [
            new transports.Console({
                level: 'debug',
                format: format.json(),
            }),
        ],
    });
}

const log = config.production ? createJSONLogger() : createHumanReadableLogger();

export default log;
