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
  // Create the directory if it does not exist
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
    colorize: false,
    maxFiles: '14d',
  },
};

const createLogger = {
  // For HTTP VERBOSE DEBUG SILLY
  primary: winston.createLogger({
    transports: [
      new winston.transports.File({
        maxSize: '20m',
        maxFiles: 10,
        filename: `${dir}/${currentdate}-primary.log`,
        format: winston.format.combine(
          // winston.format.colorize({ all: true }),
          winston.format.timestamp(),
          winston.format.align(),
          winston.format.prettyPrint(),
          winston.format.errors({ stack: true })
          // winston.format.printf(
          //   (info) => `${info.timestamp} ${info.level}: ${info.message}`
          // )
        ),
      }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // do not exit on handled exceptions
  }),

  danger: winston.createLogger({
    transports: [
      new winston.transports.File({
        maxSize: 10240,
        maxFiles: 10,
        filename: `${dir}/${currentdate}-danger.log`,
        format: winston.format.combine(
          // winston.format.colorize({ all: true }),
          winston.format.timestamp(),
          winston.format.align(),
          winston.format.prettyPrint(),
          winston.format.errors({ stack: true })
          // winston.format.printf(
          //   (info) => `${info.timestamp} ${info.level}: ${info.message}`
          // )
        ),
      }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // do not exit on handled exceptions
  }),
};

export { createLogger };
