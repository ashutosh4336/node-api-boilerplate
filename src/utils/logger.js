import winston from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = process.env.LOG_DIR;

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

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
    zippedArchive: true,
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

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
