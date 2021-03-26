// @ts-nocheck
import { loggers } from '../utils/logger.js';

const writeLogError = (...params) => {
  loggers.primary.error([...params].join(' - '));
  return;
};
const writeLogInfo = (...params) => {
  loggers.primary.info([...params].join(' - '));
  return;
};
const writeLogDebug = (...params) => {
  loggers.primary.debug([...params].join(' - '));
  return;
};
const writeLogSilly = (...params) => {
  loggers.primary.silly([...params].join(' - '));
  return;
};
const writeLogWarn = (...params) => {
  loggers.primary.warn([...params].join(' - '));
  return;
};

export {
  writeLogError,
  writeLogInfo,
  writeLogDebug,
  writeLogSilly,
  writeLogWarn,
};
