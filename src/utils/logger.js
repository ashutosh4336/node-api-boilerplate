// @ts-nocheck
import winston from 'winston';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = process.env.LOG_DIR;

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

const now = Date.now();
const currentdate = format(now, 'YYY-MM-dd');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'warn';

const options = {
  file: {
    level: logLevel,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};

const timeFormat = () => {
  // return { format: 'YYYY-MM-DD HH:mm:ss' };
  const dateFormat =
    format(Date.now(), 'dd MMM yyyy') +
    ' at ' +
    new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  return dateFormat;
};

const loggers = {
  primary: winston.createLogger({
    // level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: `${dir}/${currentdate}.log`,
        maxsize: 20480,
        maxFiles: 20,
        format: winston.format.combine(
          winston.format.timestamp({ format: timeFormat }),
          winston.format.align(),
          winston.format.errors({ stack: true }),
          winston.format.prettyPrint()
        ),
      }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // do not exit on handled exceptions
  }),
};

export { loggers };
